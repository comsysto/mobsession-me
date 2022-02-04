import React, { FC, ReactNode } from "react";
import styled from "styled-components";

interface Props {
  title?: string;
  cx: number;
  cy: number;
  r: number;
  onClick?: () => void;
  onMouseOver?: () => void;
  children: ReactNode;
}

export const ClickableGroup: FC<Props> = ({ title, cx, cy, r, onClick, onMouseOver, children, ...props }: Props) => (
  <StyledClickableGroup {...props} transform={`translate(${cx}, ${cy}) scale(${r})`}>
    {title && <title>{title}</title>}
    <g onClick={onClick} onMouseOver={onMouseOver}>
      <g transform="scale(1.4)">{children}</g>
    </g>
  </StyledClickableGroup>
);

const StyledClickableGroup = styled.g`
  cursor: pointer;
`;
