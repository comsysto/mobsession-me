import styled from "styled-components";
import { Columns, Heading, Button } from "react-bulma-components";


export const StyledParagraph = styled.p`
  font-size: 1.15rem;
`;

export const StyledLeftFrame = styled(Columns.Column)`
  .title {
    font-weight: 800;
    letter-spacing: -2px;
  }
`;

export const StyledRightFrame = styled(Columns.Column)`
  .title {
    font-weight: 800;
    letter-spacing: -1px;
  }
  .description {
    margin-top: 1rem;
    margin-bottom: 1rem !important;
    
    font-size: 1.15rem;
  }
`;

export const Subtitle = styled(Heading)`
  line-height: 1.9rem;
`;

export const Description = styled.p`
  margin-top: 1rem;
  margin-bottom: 1rem !important;
  
  font-size: 1.15rem;
`;

export const StyledButton = styled(Button)`
  margin-right: -10px;
`;

export const StyledSmall = styled.small`
  
`;

export const StyledPaddingSmall = styled(StyledSmall)`
  padding-right: 5px;
`;
