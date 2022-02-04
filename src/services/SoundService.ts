import { BehaviorSubject, combineLatest } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";
import { TimerService } from "./TimerService";

export class SoundService {
  private muted$$ = new BehaviorSubject<boolean>(false);
  readonly muted$ = this.muted$$.asObservable();

  constructor(private readonly timerService: TimerService, private readonly timeUpSound: HTMLAudioElement) {}

  private readonly subscription = combineLatest([
    this.timerService.remainingSeconds$,
    this.timerService.running$,
    this.muted$,
  ])
    .pipe(
      distinctUntilChanged(
        (o1, o2) => o1 === o2,
        ([remainingSeconds, running, muted]) => `${remainingSeconds}/${running}/${muted}`
      )
    )
    .subscribe(([remainingSeconds, running, muted]) => {
      if (muted) {
        return;
      }

      if (running && remainingSeconds <= 1) {
        this.playSound();
      }
    });

  private playSound() {
    this.timeUpSound.play().catch(e => {
      console.warn(`Failed playing sound: ${e.message}`);
      return Promise.resolve();
    });
  }

  mute() {
    this.muted$$.next(true);
  }

  unmute() {
    this.muted$$.next(false);
  }

  close() {
    this.subscription.unsubscribe();
  }
}
