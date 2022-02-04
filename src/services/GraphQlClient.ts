import { API, graphqlOperation } from "aws-amplify";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { Observable, from } from "rxjs";
import { map } from "rxjs/operators";
import {
  CreateSessionDataInput,
  CreateSessionDataMutation,
  GetSessionDataQuery,
  OnUpdateSessionDataByIdSubscription,
  ParticipantRoleData,
  SessionData,
  TimerEventTypeData,
  UpdateSessionDataInput,
  UpdateSessionDataMutation,
} from "../graphql/API";
import { Session } from "../domain/Session";
import { Participant } from "../domain/Participant";
import { ParticipantRole } from "../domain/ParticipantRole";
import { createSessionData, updateSessionData } from "../graphql/mutations";
import { getSessionData } from "../graphql/queries";
import { onUpdateSessionDataById } from "../graphql/subscriptions";
import { TimerEvent } from "../domain/TimerEvent";
import { TimerEventType } from "../domain/TimerEventType";

export class GraphQlClient {
  constructor() {}

  /**
   * This method is used to adapt the amplify graphQl api to a consistent interface which returns a observable of the
   */
  private execute<T>(graphQl: string, variables: { [key: string]: any }): Observable<T> {
    // here this weird mapping happens ... that dependent of the operation a promise or a observable is returned ...
    // https://github.com/aws-amplify/amplify-js/issues/3704
    const operation = graphqlOperation(graphQl, variables);
    const resultWeirdType = API.graphql(operation);
    const isPromiseOperation = graphQl.trim().startsWith("query") || graphQl.trim().startsWith("mutation");

    if (isPromiseOperation) {
      // in case of promise, map to rxjs observable
      const resultPromise: Promise<GraphQLResult<T>> = resultWeirdType as unknown as Promise<GraphQLResult<T>>;
      return from(resultPromise).pipe(map(result => result.data!));
    }

    // create a new rxjs observable to adapt the old style observable from amplify
    const oldObservable = resultWeirdType as unknown as Observable<any>;
    return new Observable<T>(subscriber => {
      const subscription = oldObservable.subscribe(
        value => subscriber.next(value?.value?.data),
        error => subscriber.error(error)
      );
      return () => subscription.unsubscribe();
    });
  }

  createSession(data: CreateSessionData): Observable<Session> {
    console.log("GraphQlService.createSession", data);
    const result = this.execute<CreateSessionDataMutation>(createSessionData, {
      input: {
        id: data.sessionId,
        intervalInMinutes: Math.floor(data.intervalInSeconds / 60),
        expiresAt: data.expiryTime,
        participants: data.participants,
      } as CreateSessionDataInput,
    });
    return result.pipe(map(d => this.mapMobSessionToSession(d.createSessionData!)));
  }

  getSession(sessionId: string): Observable<Session | null> {
    return this.execute<GetSessionDataQuery>(getSessionData, { id: sessionId }).pipe(
      map(s => (s.getSessionData ? this.mapMobSessionToSession(s.getSessionData!) : null))
    );
  }

  subscribeSession(sessionId: string): Observable<Session> {
    console.log("GraphQlService.subscribeSession", sessionId);
    return this.execute<OnUpdateSessionDataByIdSubscription>(onUpdateSessionDataById, {
      id: sessionId,
    }).pipe(map(result => this.mapMobSessionToSession(result.onUpdateSessionDataById!)));
  }

  private mapMobSessionToSession(sessionData: SessionData): Session {
    const participants = (sessionData.participants || []).map(
      p => new Participant(p!.id!, p!.name!, ParticipantRole[p!.role!])
    );

    const timerEvents = (sessionData.timerEvents || []).map(
      t => new TimerEvent(TimerEventType[t!.type!], t!.timestampSeconds!)
    );
    return new Session(sessionData.id!, sessionData.intervalInMinutes! * 60, participants, timerEvents);
  }

  updateSession(session: Session): Observable<Session> {
    console.log("GraphQlService.updateSession", session);
    const result = this.execute<UpdateSessionDataMutation>(updateSessionData, {
      input: {
        id: session.id,
        participants: session.participants.map(p => ({ id: p.id, name: p.name, role: ParticipantRoleData[p.role!] })),
        intervalInMinutes: session.intervalInSeconds ? Math.floor(session.intervalInSeconds / 60) : undefined,
        timerEvents: session.timerEvents.map(e => ({
          type: TimerEventTypeData[e.type],
          timestampSeconds: e.timestampSeconds,
        })),
      } as UpdateSessionDataInput,
    });
    return result.pipe(map(d => this.mapMobSessionToSession(d.updateSessionData!)));
  }
}

export interface CreateSessionData {
  readonly sessionId: string;
  readonly intervalInSeconds: number;
  readonly expiryTime: number;
  readonly participants?: Array<Participant>;
}
