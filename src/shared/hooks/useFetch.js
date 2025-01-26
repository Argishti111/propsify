import { useCallback, useState } from "react";

export function useFetch(service, defaultValue) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState(defaultValue);

  const fetchData = useCallback(
    (requsetBody) => {
      setLoading(true);
      setError(false);
      if (!loading) {
        service(requsetBody)
          .then((resData) => {
            setData(resData);
            setLoading(false);
            return resData;
          })
          .catch((e) => {
            setError(true);
            setLoading(false);
          });
      }
    },
    [loading]
  );

  return { data, fetchData, setData, loading, error };
}
