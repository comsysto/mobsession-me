import { BehaviorSubject, concat, Observable, of, ReplaySubject, Subject } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  first,
  mergeWith,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from "rxjs/operators";
import { DateTime } from "luxon";
import { Config } from "../config/Config";
import { Session } from "../domain/Session";
import { GraphQlClient } from "./GraphQlClient";

export class SessionRepository {
  private static DEFAULT_INTERVAL = 10 * 60;

  constructor(private readonly graphQlService: GraphQlClient, private readonly config: Config) {}

  private readonly closed$$ = new Subject<void>();

  private readonly sessionId$$ = new BehaviorSubject<string | null>(null);

  private readonly optimisticSessionUpdates$$ = new ReplaySubject<Session>();

  readonly sessionId$: Observable<string | null> = this.sessionId$$.asObservable().pipe(distinctUntilChanged());

  readonly session$: Observable<Session | null> = this.sessionId$.pipe(
    switchMap(id => {
      if (!id) {
        return of(null);
      }

      // try to load session if the session is not available...
      return this.graphQlService.getSession(id).pipe(
        switchMap(loadedSession => {
          if (loadedSession) {
            return of(loadedSession);
          }

          // ... create a session with default values ....
          return this.graphQlService.createSession({
            sessionId: id,
            intervalInSeconds: SessionRepository.DEFAULT_INTERVAL,
            expiryTime: this.expiryTime(),
            participants: [],
          });
        })
      );
    }),
    switchMap(session => {
      console.log("subscribing to session", session);

      if (!session) {
        return of(null);
      }

      // ... and subscribe for updates ...
      // we must concat the initial state to the updates from the subscription
      // as the subscribe function will not emit the initial state ...
      return concat(of(session), this.graphQlService.subscribeSession(session.id)).pipe(
        mergeWith(this.optimisticSessionUpdates$$),
        // filter session of subscription as amplify don't support this on local mock
        // this is not needed in normal operation, but is needed that app works right in local development
        // https://github.com/aws-amplify/amplify-cli/issues/4725
        filter(s => s?.id === session.id)
      );
    }),
    startWith(null),
    tap(session => console.log("current session", session)),
    shareReplay(1)
  );

  loadOrCreateSession(sessionId: string) {
    this.sessionId$$.next(sessionId);
  }

  updateSession(fn: (session: Session) => Session) {
    this.session$.pipe(first(), filter(Boolean), takeUntil(this.closed$$)).subscribe(currentSession => {
      const updatedSession = fn(currentSession);
      console.log("updating session", { currentSession, updatedSession });

      this.optimisticSessionUpdates$$.next(updatedSession);
      this.graphQlService.updateSession(updatedSession);
    });
  }

  resetSession() {
    this.sessionId$$.next(null);
  }

  close() {
    this.closed$$.next();
    this.closed$$.complete();
  }

  private expiryTime(): number {
    return Math.floor(DateTime.now().plus({ days: this.config.session_ttl_days }).toSeconds());
  }
}
