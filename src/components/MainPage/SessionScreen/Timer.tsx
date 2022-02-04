import React, { FC } from "react";
import { Clock } from "./Timer/Clock";
import { ClockControls } from "./Timer/ClockControls";
import { ParticipantControls } from "./Timer/ParticipantControls";
import { GeneralControls } from "./Timer/GeneralControls";
import { IntervalControls } from "./Timer/IntervalControls";

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const Timer: FC<Props> = ({}: Props) => {
  return (
    <div data-testid="timer" style={{ width: "100%", height: "100%" }}>
      <svg width="100%" height="100%" viewBox="-1.2 -1.1 2.6 2.6" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <Clock data-testid="clock" />
        <ClockControls data-testid="clock-controls" />
        <GeneralControls x={1.2} y={-0.9} data-testid="general-controls" />
        <ParticipantControls data-testid="participant-controls" />
        <IntervalControls data-testid="interval-controls" />
      </svg>
    </div>
  );
};
