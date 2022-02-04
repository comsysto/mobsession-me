import { BehaviorSubject } from "rxjs";
import { distinctUntilChanged } from "rxjs/operators";

export class FullscreenService {
  private fullscreen$$ = new BehaviorSubject<boolean>(false);
  readonly fullscreen$ = this.fullscreen$$.asObservable().pipe(distinctUntilChanged());

  enter() {
    this.fullscreen$$.next(true);
  }

  exit() {
    this.fullscreen$$.next(false);
  }
}
