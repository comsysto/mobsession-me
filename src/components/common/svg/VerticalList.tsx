import React, { FC, ReactNodeArray } from "react";
import { Transform } from "./Transform";

interface Props {
  x: number;
  y: number;
  distance: number;
  children: ReactNodeArray;
}

export const VerticalList: FC<Props> = ({ x, y, distance, children, ...props }: Props) => {
  return (
    <Transform {...props} x={x} y={y}>
      {children
        .filter(child => React.isValidElement(child))
        .map((child, index) => (
          <Transform key={index} y={distance * index}>
            {child}
          </Transform>
        ))}
    </Transform>
  );
};
