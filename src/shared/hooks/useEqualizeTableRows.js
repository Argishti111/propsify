import { useCallback, useEffect } from "react";

let timeout = 0;
let timeout2 = 0;
let timeout3 = 0;
let windowResizeTimeout = 0;
export function useEqualizeTableRows(items) {
  useEffect(() => {
    addScrollTablesEvent();
  }, []);

  const addScrollTablesEvent = useCallback(() => {
    let target = document.getElementById("primaryBody");
    let target2 = document.getElementById("targetBody");
    let target3 = document.getElementById("actionBody");

    target.addEventListener("scroll", () => {
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      timeout = setTimeout(() => {
        if (target3) {
          target3.scrollTop = target.scrollTop;
        }
        target2.scrollTop = target.scrollTop;
      }, 0);
    });
    target2.addEventListener("scroll", () => {
      clearTimeout(timeout);
      clearTimeout(timeout3);
      timeout2 = setTimeout(() => {
        target.scrollTop = target2.scrollTop;
        if (target3) {
          target3.scrollTop = target2.scrollTop;
        }
      }, 0);
    });

    target3?.addEventListener("scroll", () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
      timeout3 = setTimeout(() => {
        target.scrollTop = target3.scrollTop;
        target2.scrollTop = target3.scrollTop;
      }, 0);
    });
  }, [timeout, timeout2]);

  useEffect(() => {
    window.addEventListener("resize", resizeRowsOnWindowResize);
    resizeRowsOnWindowResize();
    return () => {
      window.removeEventListener("resize", resizeRowsOnWindowResize);
    };
  }, [items]);

  const resizeRowsOnWindowResize = useCallback(() => {
    if (items) {
      clearTimeout(windowResizeTimeout);
      windowResizeTimeout = setTimeout(() => {
        items.forEach((item) => {
          let primary = document.getElementById(`${item.id}primary`);
          let secondary = document.getElementById(`${item.id}secondary`);
          let action = document.getElementById(`${item.id}action`);

          secondary.style.height =
            primary.getBoundingClientRect().height + "px";

          if (action)
            action.style.height = primary.getBoundingClientRect().height + "px";
        });
      }, 100);
    }
  }, [items]);
}
