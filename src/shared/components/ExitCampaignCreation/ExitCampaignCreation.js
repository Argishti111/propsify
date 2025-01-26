import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import { CustomButton, Modal } from "..";
import { tinyButtonStyle } from "../../styles/style";

export function ExitCampaignCreation({
  open,
  title = "Exit print campaign creation",
  handleCancel,
  draftsLink = "/lead-generation/print-marketing/draft",
  handleClose,
}) {
  const navigate = useNavigate();
  return (
    <Modal
      PaperProps={{ sx: { maxWidth: 450, margin: { md: 4, sm: 0, xs: 0 } } }}
      titleChildren={<div />}
      open={open}
      onClose={handleCancel}
      title={title}
    >
      <Typography textAlign="center" px={8} mt={7} variant="h5">
        Are you sure you'd like to exit creating a new campaign?
      </Typography>
      <Typography
        textAlign="center"
        px={4}
        mt={3}
        fontSize="1.063rem"
        variant="p"
      >
        Don't worry! Your new campaign is automatically saved in the drafts
        folder.
      </Typography>
      <CustomButton
        onClick={() => {
          handleClose();
          navigate(draftsLink);
        }}
        color="secondary"
        style={tinyButtonStyle}
        sx={{
          fontSize: "0.813rem",
          width: 114,
          marginTop: 6,
          marginBottom: 12,
          alignSelf: "center",
        }}
      >
        GO TO DRAFTS
      </CustomButton>
      <Box display="flex" sx={{ borderTop: "1px solid #dbd3ba" }}>
        <CustomButton
          onClick={handleCancel}
          color="secondary"
          sx={{ fontSize: 20, width: "50%", letterSpacing: 2 }}
        >
          GO BACK
        </CustomButton>
        <CustomButton
          onClick={handleClose}
          sx={{ fontSize: 20, width: "50%", letterSpacing: 2 }}
        >
          EXIT
        </CustomButton>
      </Box>
    </Modal>
  );
}
