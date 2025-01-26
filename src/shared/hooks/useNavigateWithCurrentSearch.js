import { useNavigate } from "react-router";

export function useNavigateWithCurrentSearch() {
  const navigate = useNavigate();
  return (pathname, options) =>
    navigate({
      pathname,
      search: window.location.search,
      ...options,
    });
}
