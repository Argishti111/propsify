import { useCallback, useState } from "react";
import { sendPasswordRecover } from "../../services";

export function usePasswordRecoveryRequest(onSend = () => {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const recoverPassword = useCallback((email) => {
    setError("");
    setLoading(true);
    sendPasswordRecover(email)
      .then((data) => {
        if (data.success) {
          onSend();
          return setSent(true);
        }
        setError(data.errorMessage);
      })
      .catch(() => {
        setError("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, []);

  return { recoverPassword, error, loading, sent };
}
