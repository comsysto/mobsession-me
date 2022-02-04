/* eslint-disable no-unused-vars */
import { combineLatest, interval, Observable, of, Subject } from "rxjs";
import { filter, map, pairwise, switchMap, takeUntil, withLatestFrom } from "rxjs/operators";
import { TimerEventType } from "../domain/TimerEventType";
import { TimerEvent } from "../domain/TimerEvent";
import { SessionRepository } from "./SessionRepository";

export class TimerService {
  readonly durationSeconds$ = this.sessionRepository.session$.pipe(
    map(session => (session ? session.intervalInSeconds : null))
  );

  private readonly events$: Observable<ReadonlyArray<TimerEvent>> = this.sessionRepository.session$.pipe(
    map(s => s?.timerEvents ?? [])
  );

  readonly running$ = this.events$.pipe(
    map(ops => ops.length > 0 && ops[ops.length - 1].type === TimerEventType.START)
  );

  readonly seconds$ = this.running$.pipe(
    switchMap(running => (running ? interval(1000) : of(0))),
    withLatestFrom(this.events$),
    map(([_, operations]) => this.calculateSeconds(operations))
  );

  private readonly close$$ = new Subject();

  readonly remainingSeconds$ = combineLatest([this.seconds$, this.durationSeconds$]).pipe(
    map(([seconds, durationSeconds]) => (durationSeconds !== null && seconds !== null ? durationSeconds - seconds : 0))
  );

  readonly timeComponents$: Observable<{ mins: number; secs: number } | null> = this.remainingSeconds$.pipe(
    map(time =>
      time !== null
        ? {
            mins: Math.floor(time / 60),
            secs: time % 60,
          }
        : null
    )
  );

  readonly percent$ = combineLatest([this.durationSeconds$, this.remainingSeconds$]).pipe(
    map(([duration, remaining]) => {
      return duration && remaining ? (duration - remaining) / duration : null;
    })
  );

  constructor(private readonly sessionRepository: SessionRepository) {
    this.remainingSeconds$
      .pipe(
        pairwise(),
        filter(([lastSecond, second]) => (lastSecond === 1 && second === 0) || second < 0),
        takeUntil(this.close$$)
      )
      .subscribe(() => this.sessionRepository.updateSession(s => s.clearTimerEvents().rotateDriver()));
  }

  start() {
    this.pushEvent(TimerEventType.START);
  }

  reset() {
    this.sessionRepository.updateSession(s => s.clearTimerEvents());
  }

  pause() {
    this.pushEvent(TimerEventType.PAUSE);
  }

  close() {
    this.close$$.next(undefined);
    this.close$$.complete();
  }

  private pushEvent(type: TimerEventType) {
    this.sessionRepository.updateSession(s => s.pushTimerEvent(new TimerEvent(type, this.nowInSecs())));
  }

  private nowInSecs() {
    return Math.floor(Date.now() / 1000);
  }

  private calculateSeconds(operations: ReadonlyArray<TimerEvent>): number {
    const [lastOperation, secondSum] = operations.reduce<[TimerEvent | null, number]>(
      ([lastOp, seconds], op) => [
        op,
        lastOp?.type === TimerEventType.START && op.type === TimerEventType.PAUSE
          ? seconds + op.timestampSeconds - lastOp.timestampSeconds
          : seconds,
      ],
      [null, 0]
    );

    if (lastOperation && lastOperation.type === TimerEventType.START) {
      return secondSum + this.nowInSecs() - lastOperation!.timestampSeconds;
    }

    return secondSum;
  }
}
