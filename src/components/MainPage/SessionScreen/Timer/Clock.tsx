import React, { FC } from "react";
import styled, { keyframes } from "styled-components";
import { formatTime } from "../../../../utils/formatTime";
import { useTimerService } from "../../../../utils/useTimerService";
import { useObservable } from "../../../../utils/useObservable";

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const Clock: FC<Props> = ({}: Props) => {
  const timerService = useTimerService();
  const time = useObservable("Timer.time", timerService.timeComponents$, { mins: 0, secs: 0 });
  const percent = useObservable("Timer.interval", timerService.percent$, 0) || 0;
  const running = useObservable("Timer.running", timerService.running$, false);

  // Path calculation based on:
  // https://medium.com/hackernoon/a-simple-pie-chart-in-svg-dbdd653b6936
  const arcX = Math.cos(2 * Math.PI * percent);
  const arcY = Math.sin(2 * Math.PI * percent);
  const path = [`M 1 0`, `A 1 1 0 ${percent > 0.5 ? 1 : 0} 1 ${arcX} ${arcY}`, `L 0 0`].join(" ");

  return (
    <g>
      <StyledOuterCircle cx="0" cy="0" r="1" />
      <StyledBackgroundCircle className={running ? "running" : ""} cx="0" cy="0" r="0.9" />
      <g transform="rotate(-90) scale(0.9)">
        <StyledWedgePath d={path} />
      </g>
      <StyledInnerCircle cx="0" cy="0" r="0.6" />
      {time && (
        <StyledTimerText data-testid="timer-text" x="0" y="0.15" textAnchor="middle">
          {formatTime(time)}
        </StyledTimerText>
      )}
    </g>
  );
};

const darkGrey = "#aaaaaa";

const StyledOuterCircle = styled.circle`
  fill: ${darkGrey};
  stroke: #aaa;
  stroke-width: 0.02px;
`;

const colorShift = keyframes`
  0% {
    fill: hsl(166, 67%, 51%);
  }
  50% {
    fill: #a9d4ca;
  }
  100% {
    fill: hsl(166, 67%, 51%);
  }
`;

const StyledBackgroundCircle = styled.circle`
  fill: hsl(161, 45%, 61%);

  &.running {
    animation: ${colorShift} 2s linear infinite;
  }
`;

const StyledWedgePath = styled.path`
  fill: #ddd;
`;

const StyledInnerCircle = styled.circle`
  fill: ${darkGrey};
`;

const StyledTimerText = styled.text`
  //  font-family: "Arial-BoldMT", "Arial", sans-serif;
  //stroke: #666666;
  //stroke-width: 0.00001px;
  font-family: "Fira Sans", monaco, Consolas, "Lucida Console", monospace;
  font-weight: 700;
  font-size: 0.4px;
`;
