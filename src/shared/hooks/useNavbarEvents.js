import { useCallback, useState } from "react";

let scrollTimeout = 0;

export function useNavbarEvents(defaultSection, timeout = 500) {
  const [currentSection, setCurrentSection] = useState(defaultSection);

  const handleScroll = useCallback(
    (e) => {
      for (let child of e.target.children) {
        clearTimeout(scrollTimeout);

        const childRect = child.getBoundingClientRect();
        if (childRect.top < 320 && childRect.top > 0) {
          setCurrentSection(child.id);

          scrollTimeout = setTimeout(() => {
            let navItem = document.getElementById(`item${child.id}`);
            if (navItem) {
              navItem.focus();
              navItem.scrollIntoView({
                behavior: "auto",
                block: "center",
                inline: "center",
              });
            }
          }, timeout);
          break;
        }
      }
    },
    [currentSection]
  );
  return { currentSection, setCurrentSection, handleScroll };
}
