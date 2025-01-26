import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { unlinkAdAccount } from "../../../../services";

import {
  CustomButton,
  ErrorMessage,
  Modal,
  ModalActions,
  ModalLoading,
} from "../../../../shared/components";

export function DisconnectAdAccount({
  open,
  onDisconnect,
  onClose = () => {},
  setAdAccount,
  adAccount,
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleDisconnect = useCallback(() => {
    unlinkAdAccount(adAccount.id)
      .then((data) => {
        if (data.success) setAdAccount(null);
        else {
          setError(data.errorMessage);
        }
      })
      .catch(() => {
        setError("Failed to disconnect account");
      })
      .finally(() => {
        onClose();
        setLoading(false);
      });
    setLoading(true);
  }, [adAccount]);

  return loading ? (
    <ModalLoading />
  ) : (
    <>
      <ErrorMessage
        open={!!error}
        title="Failed!"
        onClose={() => setError("")}
        message={error}
      />
      <Modal
        open={open}
        onClose={onClose}
        title="Disconnect Ad account"
        PaperProps={{ sx: { mx: { md: 4, sm: 2, xs: 1 } } }}
        titleChildren={<div />}
      >
        <Box
          px={5}
          py={7}
          sx={{ overflowY: "scroll" }}
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Typography mb={3} maxWidth={368} textAlign="center" variant="h5">
            Are you sure you'd like to disconnect your Google Ads Account?
          </Typography>

          <Typography maxWidth={368} textAlign="center" variant="body1">
            Disconnecting your Google Ads account will NOT cancel any digital
            marketing campaigns. Navigate to{" "}
            <a href="https://ads.google.com/" target="_blank">
              Google Ads
            </a>{" "}
            to manage your Google Ads campaigns.
          </Typography>
        </Box>
        <ModalActions
          secondAction="DISCONNECT"
          onFirstAction={onClose}
          onSecondAction={handleDisconnect}
        />
      </Modal>
    </>
  );
}
