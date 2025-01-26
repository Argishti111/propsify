import React, { useCallback, useState } from "react";
import { Modal, ModalLoading } from "../../../../shared/components";
import { useStackNavigation } from "../../../../shared/hooks";
import { CreateAccount, SetUpBilling, SetUpComplete } from "./components";

export function CreateAdAccount({ token, open, onClose, onConnect }) {
  const { Component, clearStack } = useStackNavigation([
    CreateAccount,
    // SetUpBilling,
    SetUpComplete,
  ]);

  const [timeZone, setTimeZone] = useState("America/New_York");
  const [currencyCode, setCurrencyCode] = useState("USD");
  const [email, setEmail] = useState("");
  const [descriptiveName, setDescriptiveName] = useState("");
  const [modalLoading, setModalLoading] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
    setEmail("");
    setDescriptiveName("");
    setCurrencyCode("USD");
    setTimeZone("America/New_York");
    clearStack();
  }, []);

  return (
    <>
      {modalLoading && <ModalLoading />}
      <Modal
        open={open}
        style={{ display: modalLoading ? "none" : "block" }}
        onClose={handleClose}
        PaperProps={{ sx: { mx: { md: 4, sm: 2, xs: 1 } } }}
        titleChildren={<div />}
        title="Set up Google Ads account"
      >
        <Component
          token={token}
          timeZone={timeZone}
          setTimeZone={setTimeZone}
          currencyCode={currencyCode}
          setCurrencyCode={setCurrencyCode}
          email={email}
          setEmail={setEmail}
          descriptiveName={descriptiveName}
          setDescriptiveName={setDescriptiveName}
          onClose={handleClose}
          onConnect={onConnect}
          setModalLoading={setModalLoading}
        />
      </Modal>
    </>
  );
}
