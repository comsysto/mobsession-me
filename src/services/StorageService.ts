import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";

export class StorageService {
  private static readonly USERNAME_KEY = "user-name";
  private static readonly SESSION_ID_KEY = "session-id";
  private static readonly PARTICIPANT_ID_KEY = "participant-id";

  private data$$ = new BehaviorSubject<Data>({
    username: localStorage.getItem(StorageService.USERNAME_KEY),
    sessionId: localStorage.getItem(StorageService.SESSION_ID_KEY),
    participantId: localStorage.getItem(StorageService.PARTICIPANT_ID_KEY),
  });
  readonly username$ = this.data$$.pipe(map(data => data.username));
  readonly sessionId$ = this.data$$.pipe(map(data => data.sessionId));
  readonly participantId$ = this.data$$.pipe(map(data => data.participantId));

  private dataSubscription = this.data$$.subscribe({
    next: data => {
      this.storeOrRemoveFromLocalStorage(StorageService.USERNAME_KEY, data.username);
      this.storeOrRemoveFromLocalStorage(StorageService.SESSION_ID_KEY, data.sessionId);
      this.storeOrRemoveFromLocalStorage(StorageService.PARTICIPANT_ID_KEY, data.participantId);
    },
  });

  private storeOrRemoveFromLocalStorage(key: string, value: string | null) {
    if (value) {
      localStorage.setItem(key, value);
    } else {
      localStorage.removeItem(key);
    }
  }

  get username(): string | null {
    return this.data$$.value.username;
  }

  get sessionId(): string | null {
    return this.data$$.value.sessionId;
  }

  get participantId(): string | null {
    return this.data$$.value.participantId;
  }

  updateUsername(username: string | null) {
    this.updateData({ username });
  }

  updateSessionId(sessionId: string | null) {
    this.updateData({ sessionId });
  }

  updateParticipantId(participantId: string | null) {
    this.updateData({ participantId });
  }

  private updateData(updatedData: Partial<Data>) {
    this.data$$.next({ ...this.data$$.value, ...updatedData });
  }

  close() {
    this.dataSubscription.unsubscribe();
  }
}

interface Data {
  username: string | null;
  sessionId: string | null;
  participantId: string | null;
}
