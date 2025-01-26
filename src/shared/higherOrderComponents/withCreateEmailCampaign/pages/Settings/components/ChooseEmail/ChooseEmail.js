import { Box } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import {
  getVerifiedSenderEmails,
  sendVerificationRequest,
} from "../../../../../../../services";
import { SelectEmail, VerifyEmail } from "./components";
import store from "../../../../../../../redux/store";
import { ModalLoading } from "../../../../../../components";
import { VerifyEmailMessage } from "../../../../components";
import { useSelector } from "react-redux";

let intervalId = 0;

export function ChooseEmail({ selectedEmail, onSelect }) {
  const [loading, setLoading] = useState(true);
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const [emailToVerify, setEmailToVerify] = useState(
    () => store.getState().user.email
  );
  const emailAddressManagerOpen = useSelector(
    (state) => state.emailMarketing.emailAddressManagerOpen
  );
  const [verifyEmailMessageOpen, setVerifyEmailMessageOpen] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [verifyEmailError, setVerifyEmailError] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!emailAddressManagerOpen) fetchData();
  }, [emailAddressManagerOpen]);

  const fetchData = useCallback(() => {
    if (!intervalId) {
      setLoading(true);
    }
    getVerifiedSenderEmails()
      .then((data) => {
        setVerifiedEmails(data);

        if (data.length && !selectedEmail) {
          clearInterval(intervalId);
          intervalId = 0;
          onSelect(data[0].id, data[0].emailAddress);
          return;
        } else {
          const email = data.find((e) => e.id === selectedEmail);
          if (email) {
            onSelect(email.id, email.emailAddress);
          } else if (data.length) {
            onSelect(data[0].id, data[0].emailAddress);
          }
        }
        !emailToVerify && setEmailToVerify(store.getState().user.email);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleContinue = useCallback(() => {
    fetchData();
    closeVerifyEmailMessage();
    setSent(true);
  }, []);

  const closeVerifyEmailMessage = useCallback(
    () => setVerifyEmailMessageOpen(false),
    []
  );

  const openVerifyEmailMessage = useCallback(() => {
    setVerifyEmailMessageOpen(true);
    fetchData();
  }, []);

  const verifyEmail = useCallback(() => {
    setModalLoading(true);
    clearInterval(intervalId);
    intervalId = setInterval(() => {
      fetchData();
    }, 5000);
    sendVerificationRequest(emailToVerify)
      .then((data) => {
        if (data.success) {
          openVerifyEmailMessage();
          return;
        }
        setVerifyEmailError(data.errorMessage);
      })
      .catch(() => {
        setVerifyEmailError("Failed to send message");
      })
      .finally(() => {
        setModalLoading(false);
      });
  }, [emailToVerify]);

  return (
    <Box mb={2} maxWidth={400} display="flex" flexDirection="column">
      {modalLoading && <ModalLoading />}
      {!loading &&
        (verifiedEmails.length ? (
          <SelectEmail
            selected={selectedEmail}
            emails={verifiedEmails}
            onSelect={onSelect}
          />
        ) : (
          <VerifyEmail
            onSubmit={verifyEmail}
            value={emailToVerify}
            error={verifyEmailError}
            onChange={(e) => setEmailToVerify(e.target.value)}
            sent={sent}
          />
        ))}
      <VerifyEmailMessage
        open={verifyEmailMessageOpen}
        onClose={closeVerifyEmailMessage}
        onContinue={handleContinue}
        email={emailToVerify}
      />
    </Box>
  );
}
