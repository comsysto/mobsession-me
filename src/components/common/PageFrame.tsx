import { FC, ReactNode } from "react";
import { Columns, Container } from "react-bulma-components";
import styled from "styled-components";
import { MediaWrapper } from "../components_styles/MediaWrapper";
import { Footer } from "./Footer";

interface Props {
  children?: ReactNode;
}

export const PageFrame: FC<Props> = ({ children }: Props) => {
  return (
    <MediaWrapper>
      <StyledLandingPage className="is-offset-2">
        <Columns className="is-desktop">{children}</Columns>
      </StyledLandingPage>
      <Footer />
    </MediaWrapper>
  );
};

const StyledLandingPage = styled(Container)`
  max-width: 960px !important;
`;
