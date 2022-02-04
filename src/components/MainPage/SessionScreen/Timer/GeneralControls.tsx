import { FC, useState, useEffect } from "react";
import { useMobSessionService } from "../../../../utils/useMobSessionService";
import { useObservable } from "../../../../utils/useObservable";
import { CircularButton } from "../../../common/svg/CircularButton";
import { ScreenIcon } from "../../../common/svg/icons/ScreenIcon";
import { MuteIcon } from "../../../common/svg/icons/MuteIcon";
import { VolumeUpIcon } from "../../../common/svg/icons/VolumeUpIcon";
import { useSpeechService } from "../../../../utils/useSpeechService";
import { DoorOpenIcon } from "../../../common/svg/icons/DoorOpenIcon";
import { VerticalList } from "../../../common/svg/VerticalList";
import { ClipboardIcon } from "../../../common/svg/icons/ClipboardIcon";
import { CheckIcon } from "../../../common/svg/icons/CheckIcon";
import { useCopyService } from "../../../../utils/useCopyService";
import { useFullscreenService } from "../../../../utils/useFullscreenService";

interface Props {
  x: number;
  y: number;
}

export const GeneralControls: FC<Props> = ({ x, y }: Props) => {
  const sessionService = useMobSessionService();
  const speechService = useSpeechService();
  const copyService = useCopyService();
  const fullscreenService = useFullscreenService();
  const isFullscreen = useObservable("FullscreenControl.fullscreen", fullscreenService.fullscreen$, false);

  const [isCopied, setIsCopied] = useState(false);

  const muted = useObservable("ScreenControls.muted", speechService.muted$, false);

  const toggleFullscreen = () => {
    if (!isFullscreen) fullscreenService.enter();
    else fullscreenService.exit();
  };
  const toggleMute = () => (muted ? speechService.unmute() : speechService.mute());

  const leaveSession = () => sessionService.updateRemoveMe();

  const copyUrl = () => {
    copyService.copy(document.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3000);
  };

  useEffect(() => {
    window.history.pushState(null, "", window.location.pathname);
    window.addEventListener("popstate", () => {
      leaveSession();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        leaveSession();
      });
    };
  }, []);

  return (
    <VerticalList x={x} y={y} distance={0.25}>
      <CircularButton title="Fullscreen mode" r={0.1} onClick={toggleFullscreen}>
        <ScreenIcon data-testid="fullscreen-icon" />
      </CircularButton>
      <CircularButton title={muted ? "Unmute Speech" : "Mute Speech"} r={0.1} onClick={toggleMute}>
        {muted && <MuteIcon data-testid="mute-icon" />}
        {muted || <VolumeUpIcon data-testid="unmute-icon" />}
      </CircularButton>
      <CircularButton title="Leave session" r={0.1} onClick={leaveSession}>
        <DoorOpenIcon data-testid="leave-icon" fill="hsl(348, 80%, 58%)" />
      </CircularButton>
      <CircularButton title="Copy session URL" r={0.1} onClick={copyUrl}>
        {isCopied ? <CheckIcon /> : <ClipboardIcon data-testid="clipboard-icon" />}
      </CircularButton>
    </VerticalList>
  );
};
