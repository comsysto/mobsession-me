import { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
  #root {
    height: 100%;
    width: 100%;
  }
  body{
    background: rgb(247, 247, 247);
    height: 100vh;
    color: hsla(0, 0%, 0%, 0.66);
  }
`;
export const theme = {
  colors: {
    brandColor: "hsl(166, 67%, 51%)",
    background: "rgb(247, 247, 247)",
    textDark: "hsla(0, 0%, 0%, 0.66)",
    textLight: "hsla(0, 0%, 0%, 0.33)",
  },
  media: {
    computer: "only screen and (min-width: 1024px)",
    mobile: "only screen and (max-width: 1023px)",
  },
};
