import { FC, ReactNode, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useMobSessionService } from "../utils/useMobSessionService";

interface Props {
  children?: ReactNode;
}

export const HistoryHandler: FC<Props> = ({ children }: Props) => {
  const history = useHistory();
  const mobSessionService = useMobSessionService();

  useEffect(() => {
    const subscription = mobSessionService.sessionId$.subscribe(sessionId => {
      if (sessionId) {
        history.replace(`/${sessionId}`);
      } else {
        history.replace("/");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [mobSessionService, history]);

  return <>{children}</>;
};
