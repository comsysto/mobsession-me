import { Columns } from "react-bulma-components";
import styled from "styled-components";

export const StyledRightFrame = styled(Columns.Column)`
  .title {
    font-weight: 800;
    letter-spacing: -1px;
  }
  .description {
    margin-top: 1rem;
    margin-bottom: 1rem !important;
    color: ${props => props.theme.colors.textLight};
    font-size: 1.15rem;
  }
  .dotted {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
`;
