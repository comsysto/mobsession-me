import { Section } from "react-bulma-components";
import styled from "styled-components";

export const MediaWrapper = styled(Section)`
  @media ${props => props.theme.media.computer} {
    .container {
      margin-top: 10rem;
      background: white;
      border-radius: 10px;
    }
    .left,
    .right {
      padding: 4.5rem;
    }
  }
  @media ${props => props.theme.media.mobile} {
    .container {
      background: white;
      border-radius: 10px;
    }
    .left,
    .right {
      padding-left: 1.5rem;
      padding-right: 1.5rem;
      padding-top: 1.5rem;
      padding-bottom: 3rem;
    }
  }
`;
