import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const LandingScreenContent: FC<Props> = ({ children }: Props) => {
  return (
    <>
      <div>{children}</div>
    </>
  );
};
