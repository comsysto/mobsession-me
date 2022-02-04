import { FC, useEffect } from "react";
import { combineLatest } from "rxjs";
import { useTimerService } from "../utils/useTimerService";
import { formatTime } from "../utils/formatTime";
import { useMobSessionService } from "../utils/useMobSessionService";

interface Props {
  windowTitle: string;
}

export const TimerWindowTitle: FC<Props> = ({ windowTitle }: Props) => {
  const timerService = useTimerService();
  const sessionService = useMobSessionService();

  useEffect(() => {
    const subscription = combineLatest([timerService.timeComponents$, sessionService.loaded$]).subscribe(
      ([time, loaded]) => {
        const timePrefix = loaded && time ? `${formatTime(time)} - ` : "";
        document.title = `${timePrefix}${windowTitle}`;
      }
    );

    return () => {
      document.title = windowTitle;
      subscription.unsubscribe();
    };
  }, [timerService, sessionService, windowTitle]);

  return <></>;
};
