import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title?: string;
  r: number;
  onClick: () => void;
  children: ReactNode;
}

export const RectButton: FC<Props> = ({ title, r, onClick, children, ...props }: Props) => (
  <StyledClickableGroup {...props} transform={`scale(${r})`}>
    <g onClick={() => onClick()}>
      {title && <title>{title}</title>}
      <StyledBackgroundRect x="-1.8" y="-1" width="3.6" height="2" rx="0.8" ry="0.8" />
      <g transform="scale(1.4)">{children}</g>
    </g>
  </StyledClickableGroup>
);

const StyledBackgroundRect = styled.rect`
  fill: #d6d8e0;
  stroke: black;
  stroke-width: 0.1;
`;

const StyledClickableGroup = styled.g`
  cursor: pointer;

  &:hover {
    ${StyledBackgroundRect} {
      fill: #cfe3ff;
    }
  }
`;
