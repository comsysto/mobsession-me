import { FC } from "react";
import styled from "styled-components";
import { Columns } from "react-bulma-components";
import { PageFrame } from "../common/PageFrame";
import { StyledLeftFrame } from "../components_styles/StyledLeftFrame";
import { useFullscreenService } from "../../utils/useFullscreenService";
import { useObservable } from "../../utils/useObservable";
import { Timer } from "./SessionScreen/Timer";

export const SessionScreen: FC<{}> = () => {
  const fullscreenService = useFullscreenService();
  const isFullscreen = useObservable("SessionScreen.isFullscreen", fullscreenService.fullscreen$, false);

  return (
    <>
      {!isFullscreen ? (
        <PageFrame>
          <StyledLeftFrame className="left">
            <Timer />
          </StyledLeftFrame>
        </PageFrame>
      ) : (
        <Columns.Column className="left">
          <StyledFullscreen data-testid="fullscreen-mode">
            <Timer />
          </StyledFullscreen>
        </Columns.Column>
      )}
    </>
  );
};

const StyledFullscreen = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
