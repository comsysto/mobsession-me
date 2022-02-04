import { FC, useState } from "react";
import styled from "styled-components";
import { useMobSessionService } from "../../../../utils/useMobSessionService";
import { CircularButton } from "../../../common/svg/CircularButton";
import { RectButton } from "../../../common/svg/RectButton";
import { Transform } from "../../../common/svg/Transform";
import { TimerIcon } from "../../../common/svg/icons/TimerIcon";
import { HorizontalList } from "../../../common/svg/HorizontalList";

interface Props {}

// eslint-disable-next-line no-empty-pattern
export const IntervalControls: FC<Props> = ({}: Props) => {
  const mobSessionService = useMobSessionService();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const timeIntervals: Array<number> = [10, 15, 20, 30];
  return (
    <g>
      {isSelected && (
        <rect
          data-testid="interval-background"
          x={-10}
          y={-10}
          width={20}
          height={20}
          opacity={0.8}
          fill="#FFFFFF"
          onClick={() => setIsSelected(false)}
        />
      )}
      <g>
        <Transform x={1} y={0.3}>
          <CircularButton
            title={"Change Time"}
            cx={0.2}
            cy={-0.2}
            r={0.1}
            onClick={() => {
              setIsSelected(!isSelected);
            }}>
            <TimerIcon data-testid="timer-icon" />
          </CircularButton>
          {isSelected && (
            <g>
              <rect fill="hsl(161,45%,61%)" width={1.8} height={0.6} rx={0.05} x={-1.4} />
              <polygon fill="hsl(161,45%,61%)" points="0.1,0 0.2,-0.1 0.3,0" />
              <StyledNameText x="-0.5" y="0.22" textAnchor="middle">
                Select time
              </StyledNameText>
              <HorizontalList x={-1.1} y={0.45} distance={0.4}>
                {timeIntervals.map((value, index) => {
                  return (
                    <RectButton
                      title={`Set ${value} min`}
                      r={0.1}
                      key={index}
                      onClick={() => {
                        mobSessionService.updateTimerInterval(value * 60);
                        console.log("IntervalControls");
                        setIsSelected(!isSelected);
                      }}>
                      <StyledSmallMeText data-testid={`button-${value}`} x="0" y="0.2" textAnchor="middle">
                        {`${value} min`}
                      </StyledSmallMeText>
                    </RectButton>
                  );
                })}
              </HorizontalList>
            </g>
          )}
        </Transform>
      </g>
    </g>
  );
};

const StyledSmallMeText = styled.text`
  font-family: "Fira Sans", sans-serif;
  font-size: 0.7px;
  fill: black;
`;

const StyledNameText = styled.text`
  font-family: "Fira Sans", sans-serif;
  font-size: 0.15px;
`;
