import React, { FC } from "react";
import { Transform } from "../Transform";

interface Props {
  fill?: string;
}

export const DoorOpenIcon: FC<Props> = ({ fill, ...props }: Props) => (
  <>
    <Transform {...props} x={-0.5} y={-0.5} scale={0.0625}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={fill ?? "black"}
        className="bi bi-door-open-fill"
        viewBox="0 -2 20 29">
        <path d="M15,24H1c-0.6,0-1-0.4-1-1V1c0-0.6,0.4-1,1-1h14c0.6,0,1,0.4,1,1v7c0,0.6-0.4,1-1,1s-1-0.4-1-1V2H2v20h12v-6c0-0.6,0.4-1,1-1s1,0.4,1,1v7C16,23.6,15.6,24,15,24z" />
        <path d="M23,13H8c-0.6,0-1-0.4-1-1s0.4-1,1-1h15c0.6,0,1,0.4,1,1S23.6,13,23,13z" />
        <path d="M23,13c-0.3,0-0.5-0.1-0.7-0.3l-4-4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4C23.5,12.9,23.3,13,23,13z" />
        <path d="M19,17c-0.3,0-0.5-0.1-0.7-0.3c-0.4-0.4-0.4-1,0-1.4l4-4c0.4-0.4,1-0.4,1.4,0s0.4,1,0,1.4l-4,4C19.5,16.9,19.3,17,19,17z" />
      </svg>
    </Transform>
  </>
);
