import styled from "styled-components";
import { Columns } from "react-bulma-components";

export const StyledLeftFrame = styled(Columns.Column)`
  border-right: 5px solid ${props => props.theme.colors.background};
  .title {
    font-weight: 800;
    letter-spacing: -2px;
  }
  a:link {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
`;
