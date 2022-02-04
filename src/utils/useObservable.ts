import { Observable } from "rxjs";
import { useEffect, useState } from "react";

export function useObservable<T>(label: string, observable$: Observable<T> | undefined | null, defaultValue: T): T {
  const [observableState, setObservableState] = useState<T>(defaultValue);

  useEffect((): (() => void) | undefined => {
    if (!observable$) {
      return;
    }
    const subscription = observable$.subscribe(
      (value: T) => {
        setObservableState(value);
      },
      e => console.error(`observable ${label}`, e)
    );
    return (): void => subscription.unsubscribe();
  }, [observable$, label]);

  return observableState;
}
