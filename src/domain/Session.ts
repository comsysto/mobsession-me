import { Participant } from "./Participant";
import { ParticipantRole } from "./ParticipantRole";
import { TimerEvent } from "./TimerEvent";

export class Session {
  constructor(
    readonly id: string,
    readonly intervalInSeconds: number,
    readonly participants: ReadonlyArray<Participant>,
    readonly timerEvents: ReadonlyArray<TimerEvent>
  ) {
    Object.freeze(participants);
    Object.freeze(timerEvents);
    Object.freeze(this);
  }

  join(participant: Participant): Session {
    return this.update({ participants: [...this.participants.filter(e => e.id !== participant.id), participant] });
  }

  kick(participant: Participant): Session {
    return this.update({ participants: this.participants.filter(p => p.id !== participant.id) });
  }

  switchToDriver(participant: Participant): Session {
    return this.update({
      participants: this.participants.map(p =>
        p.id === participant.id
          ? p.update({ role: ParticipantRole.DRIVER })
          : p.update({ role: ParticipantRole.NAVIGATOR })
      ),
    });
  }

  pushTimerEvent(event: TimerEvent): Session {
    return this.update({
      timerEvents: [...this.timerEvents, event],
    });
  }

  clearTimerEvents(): Session {
    return this.update({
      timerEvents: [],
    });
  }

  update(props: {
    id?: string;
    intervalInSeconds?: number;
    participants?: ReadonlyArray<Participant>;
    timerEvents?: ReadonlyArray<TimerEvent>;
  }): Session {
    return new Session(
      props.id ?? this.id,
      props.intervalInSeconds ?? this.intervalInSeconds,
      props.participants ?? this.participants,
      props.timerEvents ?? this.timerEvents
    );
  }

  rotateDriver(): Session {
    const driverIndex = this.participants.findIndex(p => p.role === ParticipantRole.DRIVER);
    return this.update({
      participants: this.participants.map((p, i) => {
        if (i === driverIndex) {
          return p.update({ role: ParticipantRole.NAVIGATOR });
        } else if (i === (driverIndex + 1) % this.participants.length) {
          return p.update({ role: ParticipantRole.DRIVER });
        }
        return p;
      }),
    });
  }

  switchToNavigator(participant: Participant): Session {
    return this.update({
      participants: this.participants.map(p =>
        p.id === participant.id ? p.update({ role: ParticipantRole.NAVIGATOR }) : p
      ),
    });
  }

  changeInterval(timeIntervalInSeconds: number): Session {
    return this.update({ intervalInSeconds: timeIntervalInSeconds });
  }
}
