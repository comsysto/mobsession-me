import React, { FC } from "react";
import { Transform } from "../Transform";

export const TimerIcon: FC = ({ ...props }) => (
  <>
    <Transform {...props} x={-0.5} y={-0.5} scale={0.0625}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path
          d="M12,24C5.4,24,0,18.6,0,12S5.4,0,12,0s12,5.4,12,12S18.6,24,12,24z M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10
				S17.5,2,12,2z"
        />
        <path d="M12,13c-0.6,0-1-0.4-1-1V5c0-0.6,0.4-1,1-1s1,0.4,1,1v7C13,12.6,12.6,13,12,13z" />
        <path
          d="M16,17c-0.3,0-0.5-0.1-0.7-0.3l-4-4c-0.4-0.4-0.4-1,0-1.4s1-0.4,1.4,0l4,4c0.4,0.4,0.4,1,0,1.4C16.5,16.9,16.3,17,16,17z
				"
        />
      </svg>
    </Transform>
  </>
);
