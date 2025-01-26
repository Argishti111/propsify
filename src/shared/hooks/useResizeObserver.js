import { useEffect } from "react";

export function useResizeObserver(ref, resizeCallback) {
  useEffect(() => {
    if (ref.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        resizeCallback(entries[0]);
      });
      resizeObserver.observe(ref.current);

      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [ref, resizeCallback]);
}
