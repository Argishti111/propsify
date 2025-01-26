import { Box, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { useNavigate } from "react-router";
import { ModalActions } from "../../../../../../components";

export function DeleteEmailFailed({ onCancel, onNavigateToDashBoard }) {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    onNavigateToDashBoard();
    onCancel();
    navigate("/lead-generation/email-marketing");
  }, []);

  return (
    <>
      <Box
        maxWidth={600}
        px={8.75}
        py={8.5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="auto"
      >
        <img
          alt=""
          src={
            require("../../../../../../static/icons/icon-attention.svg").default
          }
          fontSize="large"
          htmlColor="#BEB082"
        />
        <Typography maxWidth={260} mb={2} textAlign="center" variant="h5">
          Attention!
        </Typography>
        <Typography textAlign="center" variant="subtitle1" mb={6}>
          This sender email address is currently associated with one or more
          scheduled email marketing campaigns. <br /> <br />
          Update the sender email address on each scheduled campaign to be able
          to delete this email address.
          <br /> <br />
          Note: any campaign currently in the "sending" state that uses this
          sender email address must be canceled before the email address may be
          deleted.
        </Typography>
      </Box>

      <ModalActions
        secondAction="GO TO DASHBOARD"
        onFirstAction={onCancel}
        onSecondAction={handleNavigate}
        secondActionStyle={{ padding: 0 }}
      />
    </>
  );
}
