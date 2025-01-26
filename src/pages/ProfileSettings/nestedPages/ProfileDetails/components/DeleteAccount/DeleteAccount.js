import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { CustomButton, Modal } from "../../../../../../shared/components";

export function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        titleChildren={<div />}
        title="Delete account"
      >
        <Typography
          textAlign="center"
          variant="h5"
          fontStyle="italic"
          paddingX={8}
          paddingTop={7}
        >
          Are you sure you'd like to delete <br /> your account?
        </Typography>
        <Typography
          textAlign="center"
          padding={8}
          paddingTop={6}
          variant="body1"
          maxWidth={500}
        >
          Click "Delete" below to delete your account.
          <br /> <br /> You will receive an email to confirm your decision. This
          will not end your subscription or payments and you will continue to be
          charged. You can cancel your subscription, or switch payment methods.
          <br /> <br />
          This can’t be reversed. All campaigns you’ve created will be
          permanently erased.
        </Typography>
        <Box display="flex" sx={{ borderTop: "2px solid #dbd3ba" }}>
          <CustomButton
            onClick={handleClose}
            color="secondary"
            sx={{ fontSize: 20, width: "50%", letterSpacing: 2 }}
          >
            GO BACK
          </CustomButton>
          <CustomButton
            onClick={handleClose}
            sx={{ fontSize: 20, width: "50%", letterSpacing: 2 }}
          >
            DELETE
          </CustomButton>
        </Box>
      </Modal>
      <CustomButton
        color="primary"
        sx={{ width: 200, mt: 4 }}
        variant="outlined"
        onClick={() => setOpen(true)}
      >
        DELETE MY ACCOUNT
      </CustomButton>
    </>
  );
}
