import { ParticipantRole } from "./ParticipantRole";

export class Participant {
  constructor(readonly id: string, readonly name: string, readonly role: ParticipantRole | null) {
    Object.freeze(this);
  }

  update(props: { id?: string; name?: string; role?: ParticipantRole }): Participant {
    return new Participant(props.id ?? this.id, props.name ?? this.name, props.role ?? this.role);
  }
}
