import { useEffect, useState } from "react";

export function useTimer(items, interval = 60000) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let i = 0;
    for (let item of items) {
      if (item.canBeCanceled > 0) {
        i = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, interval);
        break;
      }
    }
    return () => {
      if (i) clearInterval(i);
    };
  }, []);

  return timer;
}
