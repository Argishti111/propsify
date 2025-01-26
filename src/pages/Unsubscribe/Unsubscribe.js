import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { unsubscribeFromEmails } from "../../services";
import { ModalLoading } from "../../shared/components";
import { useQuery } from "../../shared/hooks";
import { UnsubscribeAction, UnsubscribeMessage } from "./components";

export function Unsubscribe() {
  const [recipientId, setRecipientId] = useState("");
  const [email, setEmail] = useState("");
  const [unsubscribed, setUnsubscribed] = useState(false);
  const [unsubscribing, setUnsubscribing] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const query = useQuery();

  useEffect(() => {
    checkAndSetParams();
  }, []);

  const checkAndSetParams = useCallback(() => {
    const recipientId = query.get("recipientId");
    const email = query.get("email");
    if (!recipientId || !email) {
      return navigate("/home");
    }
    setEmail(email);
    setRecipientId(recipientId);
  }, []);

  const handleUnsubscribe = useCallback(() => {
    setUnsubscribing(true);
    setError("");
    unsubscribeFromEmails(recipientId)
      .then((res) => {
        if (res.success) {
          setUnsubscribed(true);
        } else {
          setError("Failed to unsubscribe.");
        }
      })
      .catch(() => setError("Failed to unsubscribe."))
      .finally(() => {
        setUnsubscribing(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  }, [recipientId]);

  return (
    <Box display="flex" justifyContent="center" height="100vh">
      {unsubscribing && <ModalLoading />}

      {unsubscribed ? (
        <UnsubscribeMessage />
      ) : (
        <UnsubscribeAction
          error={error}
          email={email}
          onUnsubscribe={handleUnsubscribe}
        />
      )}
    </Box>
  );
}
