import { useCallback, useState } from "react";

export function useForceRender() {
  const [_, setState] = useState(0);
  return useCallback(() => {
    setState(Date.now());
  }, []);
}
