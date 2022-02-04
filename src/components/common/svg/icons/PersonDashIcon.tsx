import React, { FC } from "react";
import { Transform } from "../Transform";
interface Props {
  fill?: string;
}
export const PersonDashIcon: FC<Props> = ({ fill, ...props }: Props = { fill: "black" }) => (
  <>
    <Transform {...props} x={-0.5} y={-0.5} scale={0.0625}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill={fill}
        className="bi bi-person-dash-fill"
        viewBox="0 0 16 16">
        <path fillRule="evenodd" d="M11 7.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5z" />
        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      </svg>
    </Transform>
  </>
);
