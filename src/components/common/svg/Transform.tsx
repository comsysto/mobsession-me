import React, { FC, ReactNode } from "react";

interface Props {
  x?: number;
  y?: number;
  scale?: number;
  children: ReactNode;
}

export const Transform: FC<Props> = ({ x, y, scale, children, ...props }: Props) => {
  return (
    <g {...props} transform={`translate(${x ?? 0}, ${y ?? 0}) scale(${scale ?? 1})`}>
      {children}
    </g>
  );
};
