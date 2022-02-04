import React, { FC, ReactNodeArray } from "react";
import { Transform } from "./Transform";

interface Props {
  x: number;
  y: number;
  distance: number;
  children: ReactNodeArray;
}

export const HorizontalList: FC<Props> = ({ x, y, distance, children, ...props }: Props) => {
  return (
    <Transform {...props} x={x} y={y}>
      {children
        .filter(child => React.isValidElement(child))
        .map((child, index) => (
          <Transform key={index} x={distance * index}>
            {child}
          </Transform>
        ))}
    </Transform>
  );
};
