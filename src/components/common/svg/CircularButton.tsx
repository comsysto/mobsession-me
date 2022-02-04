import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title?: string;
  cx?: number;
  cy?: number;
  r: number;
  onClick: () => void;
  children: ReactNode;
}

export const CircularButton: FC<Props> = ({ title, cx, cy, r, onClick, children, ...props }: Props) => (
  <StyledClickableGroup {...props} transform={`translate(${cx ?? 0}, ${cy ?? 0}) scale(${r})`}>
    <g onClick={() => onClick()}>
      {title && <title>{title}</title>}
      <StyledBackgroundCircle r="1" />
      <g transform="scale(1.4)">{children}</g>
    </g>
  </StyledClickableGroup>
);

const StyledBackgroundCircle = styled.circle`
  fill: #d6d8e0;
`;

const StyledClickableGroup = styled.g`
  cursor: pointer;

  &:hover {
    ${StyledBackgroundCircle} {
      fill: #cfe3ff;
    }
  }
`;
