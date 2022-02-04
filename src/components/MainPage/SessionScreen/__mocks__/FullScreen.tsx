import React, { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const FullScreen: FC<Props> = ({ children }: Props) => {
  return <div data-testid="fullscreen">{children}</div>;
};
