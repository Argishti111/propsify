import { useMemo, useState } from "react";

export function useCallTimeout(time = 0) {
  const [id, setId] = useState(0);
  return useMemo(
    () => (callback) => {
      clearTimeout(id);
      setId(setTimeout(() => callback(), time));
    },
    [id]
  );
}
