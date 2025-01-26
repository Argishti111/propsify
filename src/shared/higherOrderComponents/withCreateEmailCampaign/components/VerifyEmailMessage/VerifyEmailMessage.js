import { MailOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton, Modal } from "../../../../components";

export function VerifyEmailMessage({ open, onClose, onContinue, email }) {
  return (
    <Modal
      title=""
      open={open}
      onClose={onClose}
      style={{ zIndex: 1302 }}
      titleChildren={<div />}
      titleContainerStyle={{ borderBottom: 0 }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={4.4}
        pb={9}
        pt={1}
        maxWidth={510}
      >
        <span style={{ fontSize: "2.1rem" }}>
          <MailOutline htmlColor="#BEB082" fontSize="inherit" />
        </span>
        <Typography maxWidth={260} my={2} textAlign="center" variant="h6">
          Check your email
        </Typography>
        <Typography textAlign="center" variant="subtitle1" mb={6}>
          You'll receive a link to verify your email address at <br /> {email}.
          <br /> <br /> If you don't see the email within 5 minutes, check your
          spam or junk folder before submitting a new request.
        </Typography>
        <CustomButton sx={{ width: "100%" }} onClick={onContinue}>
          CONTINUE
        </CustomButton>
      </Box>
    </Modal>
  );
}
