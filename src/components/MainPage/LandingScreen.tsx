import React, { FC, useState } from "react";
import { Button, Form } from "react-bulma-components";
import styled from "styled-components";
import { first } from "rxjs/operators";
import { PageFrame } from "../common/PageFrame";
import { useCopyService } from "../../utils/useCopyService";
import { useMobSessionService } from "../../utils/useMobSessionService";
import { useObservable } from "../../utils/useObservable";
import { DescriptionSmall } from "../components_styles/Description";
import { Field } from "./LandingScreen/Field";
import { LandingScreenContent } from "./LandingScreen/LandingScreenContent";
interface Props {}

// eslint-disable-next-line no-empty-pattern
export const LandingScreen: FC<Props> = ({}: Props) => {
  const mobSessionService = useMobSessionService();
  const copyService = useCopyService();
  const username = useObservable("LandingScreen.storedUsername", mobSessionService.username$, "");
  const sessionId = useObservable("LandingScreen.storedUsername", mobSessionService.sessionId$, "");
  // only show errors after first try to join :D
  const [showErrors, setShowErrors] = useState(false);
  const sessionIdValid = useObservable("LandingScreen.sessionValid", mobSessionService.sessionIdValid$, true);
  const usernameValid = useObservable("LandingScreen.usernameValid", mobSessionService.usernameValid$, true);
  // eslint-disable-next-line no-unused-vars
  const [copyUrl, setCopyUrl] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);

  const joinSession = () => {
    setLoading(true);
    mobSessionService
      .createOrJoinSession()
      .pipe(first())
      .subscribe(() => setLoading(false));
    if (copyUrl) {
      copyService.copy(document.location.href);
    }
  };

  return (
    <PageFrame>
      <LandingScreenContent>
        <Field
          label="Session Name"
          error={showErrors && !sessionIdValid ? "Required. Allowed characters: 'A-Z a-z 0-9 -'" : null}>
          <Form.Field kind="addons" className="has-addons-centered">
            <Form.Control fullwidth={false}>
              <StyledSessionNameInput
                className={showErrors && !sessionIdValid ? "is-danger" : ""}
                data-testid="sessionname-input"
                size="normal"
                type="text"
                placeholder="Session Name"
                value={sessionId}
                onChange={e => mobSessionService.updateSessionId(e.target.value)}
              />
            </Form.Control>
            <Form.Control>
              <Button
                title="Generate a random session ID"
                data-testid="generateId-button"
                color="primary"
                size="normal"
                onClick={() => mobSessionService.updateSessionIdToRandom()}>
                <i className="fas fa-dice" />
              </Button>
            </Form.Control>
          </Form.Field>
        </Field>
        <Field label="Nickname" error={showErrors && !usernameValid ? "Required" : null}>
          <StyledHandleNameInput
            className={showErrors && !sessionIdValid ? "is-danger" : ""}
            data-testid="nickname-input"
            size="normal"
            type="text"
            placeholder="Your Nickname"
            value={username}
            onChange={e => mobSessionService.updateUsername(e.target.value)}
          />
        </Field>
        <Form.Control>
          <Button
            color="primary"
            data-testid="join-button"
            onClick={() => {
              setShowErrors(true);
              joinSession();
            }}>
            Join Session
          </Button>
        </Form.Control>

        <DescriptionSmall>Simply copy your browser's URL to invite others.</DescriptionSmall>
      </LandingScreenContent>
    </PageFrame>
  );
};

export const StyledButton = styled(Button)`
  margin-right: -10px;
`;
export const StyledSmall = styled.small`
  color: ${props => props.theme.colors.textLight};
`;
export const StyledPaddingSmall = styled(StyledSmall)`
  padding-right: 5px;
`;

export const StyledSessionNameInput = styled(Form.Input)`
  width: 15em;
`;
export const StyledHandleNameInput = styled(Form.Input)`
  width: 12em;
`;
