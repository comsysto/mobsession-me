import { FC, useEffect } from "react";
import { useParams } from "react-router";
import { useMobSessionService } from "../utils/useMobSessionService";
import { useObservable } from "../utils/useObservable";
import { LandingScreen } from "./MainPage/LandingScreen";
import { SessionScreen } from "./MainPage/SessionScreen";

export const MainPage: FC = () => {
  const mobSessionService = useMobSessionService();
  const { sessionId } = useParams<{ sessionId: string }>();
  const joined = useObservable("LandingPage.joined", mobSessionService.joined$, false);
  useEffect(() => {
    if (sessionId && sessionId.trim()) {
      mobSessionService.updateSessionId(sessionId);
    }
  }, [mobSessionService, sessionId]);

  return <>{joined ? <SessionScreen /> : <LandingScreen />}</>;
};
