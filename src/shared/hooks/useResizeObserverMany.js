import { useEffect } from "react";

export function useResizeObserverMany(refs, resizeCallbacks) {
  useEffect(() => {
    if (!refs.some((ref) => !ref.current)) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let i = 0; i < entries.length; i++) {
          resizeCallbacks[i](entries[i]);
        }
      });
      for (let ref of refs) {
        resizeObserver.observe(ref.current);
      }
      return () => {
        resizeObserver.disconnect();
      };
    }
  }, [refs, resizeCallbacks]);
}
