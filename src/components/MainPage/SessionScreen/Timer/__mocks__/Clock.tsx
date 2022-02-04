import React, { FC } from "react";

interface Props {}

export const Clock: FC<Props> = ({}: Props) => {
  return <g data-testid = "clock"></g>;
};
