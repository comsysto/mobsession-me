import React, { FC } from "react";
import { ThemeProvider } from "styled-components";
import { Services, ServicesContext } from "../../services/ServicesContext";

import { theme } from "../../globalStyles";

interface Props {
  services?: DeepPartial<Services>;
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

export const TestBed: FC<Props> = ({ children, services }) => {
  return (
    <ThemeProvider theme={theme}>
      <ServicesContext.Provider value={services as Services}>{children}</ServicesContext.Provider>
    </ThemeProvider>
  );
};
