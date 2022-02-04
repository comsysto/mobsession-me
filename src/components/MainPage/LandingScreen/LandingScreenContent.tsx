import React, { FC, ReactNode } from "react";
import { Content, Heading } from "react-bulma-components";
import styled from "styled-components";
import { StyledLeftFrame } from "../../components_styles/StyledLeftFrame";
import { StyledRightFrame } from "../../components_styles/StyledRightFrame";
import { Description } from "../../components_styles/Description";

interface Props {
  children?: ReactNode;
}

export const LandingScreenContent: FC<Props> = ({ children }: Props) => {
  return (
    <>
      <StyledLeftFrame className="left has-text-centered">
        <Heading size={1} className="is-size-3-mobile">
          Mob Session
          <Heading renderAs="p" size={5} className="has-text-grey has-text-weight-light is-family-code">
            by&nbsp;
            <Heading
              data-testid="smartCloud-link"
              className="has-text-grey has-text-weight-light is-family-code"
              size={5}
              renderAs="a"
              href="https://www.smartcloudincubator.de/"
              target="_blank">
              Comsysto Reply
            </Heading>
          </Heading>
        </Heading>
        <Subtitle renderAs="h2" className="subtitle" mt="3" mb="4" textColor="primary" size={5} subtitle>
          A remote timer for Mob Programming that works!
        </Subtitle>
        <Content>
          <StyledParagraph>
            Start your Mob Session in the browser with one simple click and enjoy features like:
          </StyledParagraph>
          <ul>
            <li>
              <StyledParagraph>Simple link sharing</StyledParagraph>
            </li>
            <li>
              <StyledParagraph>Automatic driver rotation</StyledParagraph>
            </li>
            <li>
              <StyledParagraph>Acoustic reminder</StyledParagraph>
            </li>
            <li>
              <StyledParagraph>Visual timer</StyledParagraph>
            </li>
          </ul>
        </Content>
      </StyledLeftFrame>
      {/* we need here className because of media request */}
      <StyledRightFrame className="right has-text-centered">
        <Heading size={4}>Join a Mob Session</Heading>
        <Description>
          Create a Mob Session by providing a Session{" "}
          <span
            className="has-tooltip-left dotted"
            data-tooltip="Use the auto-generated session name or create your own">
            Name{" "}
          </span>
          and your{" "}
          <span className="has-tooltip-top dotted" data-tooltip="Your nickname in the session">
            Nickname.
          </span>
        </Description>
        {children}
      </StyledRightFrame>
    </>
  );
};

export const StyledParagraph = styled.p`
  color: ${props => props.theme.colors.textLight};
  text-align: left;
  font-size: 1.15rem;
`;

export const Subtitle = styled(Heading)`
  line-height: 1.9rem;
`;
