import React, { FC } from "react";
import { CircularButton } from "../../../common/svg/CircularButton";
import { PlayIcon } from "../../../common/svg/icons/PlayIcon";
import { StopIcon } from "../../../common/svg/icons/StopIcon";
import { ResetIcon } from "../../../common/svg/icons/ResetIcon";
import { useTimerService } from "../../../../utils/useTimerService";
import { useObservable } from "../../../../utils/useObservable";

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const ClockControls: FC<Props> = ({}: Props) => {
  const timerService = useTimerService();
  const running = useObservable("ClockControls.running", timerService.running$, false);
  return (
    <g>
      {running || (
        <CircularButton title="Start Timer" cx={0.3} cy={0.5} r={0.2} onClick={() => timerService.start()}>
          <PlayIcon data-testid="play-icon" />
        </CircularButton>
      )}
      {running && (
        <CircularButton title="Pause Timer" cx={0.3} cy={0.5} r={0.2} onClick={() => timerService.pause()}>
          <StopIcon data-testid="stop-icon" />
        </CircularButton>
      )}
      <CircularButton title="Reset Timer" cx={-0.3} cy={0.5} r={0.2} onClick={() => timerService.reset()}>
        <ResetIcon data-testid="reset-icon" />
      </CircularButton>
    </g>
  );
};
