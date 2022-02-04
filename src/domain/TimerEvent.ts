import { TimerEventType } from "./TimerEventType";

export class TimerEvent {
  constructor(readonly type: TimerEventType, readonly timestampSeconds: number) {
    Object.freeze(this);
  }
}
