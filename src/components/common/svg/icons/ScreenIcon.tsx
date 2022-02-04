import React, { FC } from "react";
import { Transform } from "../Transform";

export const ScreenIcon: FC = ({ ...props }) => (
  <>
    <Transform {...props} x={-0.5} y={-0.5} scale={0.0625}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-aspect-ratio-fill"
        viewBox="0 0 24 25">
        <path d="M5,21H1c-0.6,0-1-0.4-1-1v-4c0-0.6,0.4-1,1-1s1,0.4,1,1v3h3c0.6,0,1,0.4,1,1S5.6,21,5,21z" />
        <path d="M23,21h-4c-0.6,0-1-0.4-1-1s0.4-1,1-1h3v-3c0-0.6,0.4-1,1-1s1,0.4,1,1v4C24,20.6,23.6,21,23,21z" />
        <path d="M23,9c-0.6,0-1-0.4-1-1V5h-3c-0.6,0-1-0.4-1-1s0.4-1,1-1h4c0.6,0,1,0.4,1,1v4C24,8.6,23.6,9,23,9z" />
        <path d="M1,9C0.4,9,0,8.6,0,8V4c0-0.6,0.4-1,1-1h4c0.6,0,1,0.4,1,1S5.6,5,5,5H2v3C2,8.6,1.6,9,1,9z" />
      </svg>
    </Transform>
  </>
);
