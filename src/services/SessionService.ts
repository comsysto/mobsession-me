import { distinctUntilChanged, filter, first, map, startWith, tap } from "rxjs/operators";
import { adjectives, animals, colors, uniqueNamesGenerator } from "unique-names-generator";
import { BehaviorSubject, combineLatest, Observable, ReplaySubject } from "rxjs";
import { Participant } from "../domain/Participant";
import { ParticipantRole } from "../domain/ParticipantRole";
import { uuid } from "../utils/uuid";
import { SessionRepository } from "./SessionRepository";
import { StorageService } from "./StorageService";

export class SessionService {
  constructor(private readonly sessionRepository: SessionRepository, private readonly storageService: StorageService) {
    if (this.storageService.participantId == null) {
      this.storageService.updateParticipantId(uuid());
    }
  }

  private username$$ = new BehaviorSubject<string>(this.initialUsername());
  readonly username$ = this.username$$.asObservable().pipe(distinctUntilChanged());
  readonly usernameValid$ = this.username$.pipe(map(s => s.trim().length > 0));

  private sessionId$$ = new BehaviorSubject<string>(this.initialSessionId());
  readonly sessionId$ = this.sessionId$$.asObservable().pipe(distinctUntilChanged());
  readonly sessionIdValid$ = this.sessionId$.pipe(map(s => !!s.match(/^[a-zA-Z0-9-]+$/)));

  readonly session$ = this.sessionRepository.session$;

  readonly me$ = combineLatest([this.session$, this.storageService.participantId$]).pipe(
    map(([session, participantId]) => session?.participants.find(p => p.id === participantId))
  );

  readonly participants$ = this.session$.pipe(map(session => session?.participants || []));

  readonly loaded$ = this.session$.pipe(
    map(session => !!session),
    startWith(false),
    tap(v => console.log("loaded$", v))
  );

  readonly joined$ = this.me$.pipe(
    map(me => !!me),
    startWith(false)
  );

  createOrJoinSession(): Observable<boolean> {
    const result = new ReplaySubject<boolean>(1);
    combineLatest([this.sessionIdValid$, this.usernameValid$, this.sessionId$, this.username$])
      .pipe(first())
      .subscribe(([sessionIdValid, usernameValid, sessionId, username]) => {
        if (sessionIdValid && usernameValid) {
          this.storageService.updateUsername(username);
          this.storageService.updateSessionId(sessionId);

          this.sessionRepository.loadOrCreateSession(sessionId);
          this.sessionRepository.session$
            .pipe(
              filter(session => session?.id === sessionId),
              first()
            )
            .subscribe(() => {
              this.sessionRepository.updateSession(session => {
                // automatically make first participant to the driver...
                const role = session.participants.length === 0 ? ParticipantRole.DRIVER : ParticipantRole.NAVIGATOR;
                return session.join(new Participant(this.storageService.participantId!, username, role));
              });

              // return "true" after join is completed
              this.joined$
                .pipe(
                  filter(v => v),
                  first()
                )
                .subscribe(() => {
                  result.next(true);
                  result.complete();
                });
            });
        } else {
          // return "false" if validation fails
          result.next(false);
          result.complete();
        }
      });
    return result;
  }

  updateParticipantToDriver(participant: Participant) {
    this.sessionRepository.updateSession(s => s.switchToDriver(participant));
  }

  updateParticipantToNavigator(participant: Participant) {
    this.sessionRepository.updateSession(s => s.switchToNavigator(participant));
  }

  updateRemoveParticipant(participant: Participant) {
    this.sessionRepository.updateSession(s => s.kick(participant));
  }

  updateRemoveMe() {
    this.me$.pipe(first()).subscribe(me => {
      me && this.sessionRepository.updateSession(session => session.kick(me));
    });
  }

  resetSession() {
    this.sessionRepository.resetSession();
  }

  updateTimerInterval(intervalInSeconds: number) {
    this.sessionRepository.updateSession(session => session.changeInterval(intervalInSeconds));
  }

  updateUsername(username: string) {
    this.username$$.next(username);
  }

  updateSessionId(sessionId: string) {
    this.sessionId$$.next(sessionId);
  }

  updateSessionIdToRandom() {
    this.updateSessionId(this.generateSessionId());
  }

  private initialUsername(): string {
    const storedUsername = this.storageService.username;
    if (storedUsername) {
      return storedUsername;
    }

    return "";
  }

  private initialSessionId(): string {
    const storedSessionId = this.storageService.sessionId;
    if (storedSessionId) {
      return storedSessionId;
    }

    return this.generateSessionId();
  }

  private generateSessionId() {
    return uniqueNamesGenerator({
      dictionaries: [adjectives, colors, animals],
      style: "lowerCase",
      separator: "-",
    }); // big-black-donkey
  }
}
