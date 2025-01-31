import { useCallback, useEffect } from "react";

export function useOutsideClick(ref, callback) {
  const handleClick = useCallback((e) => {
    if (ref?.current && !ref.current.contains(e.target)) {
      callback();
    }
  });
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
}
