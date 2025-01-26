import { useCallback, useEffect, useMemo, useState } from "react";

const popElement = (count) => (prev) => {
  while (count-- > 0) {
    prev.pop();
  }
  return [...prev];
};

export function useStackNavigation(components) {
  const [stack, setStack] = useState([components[0]]);

  const goBack = useCallback((count = 1) => {
    setStack(popElement(count));
  }, []);

  const goToLastPage = useCallback(() => {
    setStack([...components]);
  }, []);
  const clearStack = useCallback(() => {
    setStack([components[0]]);
  }, []);

  const goToPage = useCallback((page) => {
    setStack(components.filter((_, index) => index < page));
  }, []);

  const goNext = useCallback(
    (props = {}) => {
      setStack((prev) => {
        if (prev.length === components.length) {
          return [components[0]];
        }
        prev.push(components[prev.length]);
        return [...prev];
      });
    },
    [components]
  );

  useEffect(() => {
    return () => {
      setStack([components[0]]);
    };
  }, []);

  const result = useMemo(() => {
    const StackComponent = stack[stack.length - 1];
    const Component = (props) => (
      <StackComponent
        goBack={goBack}
        goNext={goNext}
        goToPage={goToPage}
        page={stack.length}
        pageCount={components.length}
        {...props}
      />
    );
    return {
      Component,
      goToLastPage,
      clearStack,
      goBack,
      goNext,
      goToPage,
      page: stack.length,
    };
  }, [stack, goToLastPage]);

  return result;
}
