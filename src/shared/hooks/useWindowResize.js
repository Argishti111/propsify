import { useCallback, useEffect } from "react";
const timeout = 0;

export function useWindowResize(action) {
  const _action = useCallback(
    (e) => {
      clearTimeout(timeout);
      setTimeout(() => {
        action(e);
      }, 50);
    },
    [action, timeout]
  );
  useEffect(() => {
    window.addEventListener("resize", _action);
    return () => {
      window.removeEventListener("resize", _action);
    };
  }, []);
}
