import { DeleteOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { ModalActions } from "../../../../../../components";

export function DeleteEmailConfirm({ email, onDelete, onCancel }) {
  return (
    <>
      <Box
        maxWidth={496}
        px={6}
        py={9}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <DeleteOutline fontSize="large" htmlColor="#BEB082" />
        <Typography maxWidth={260} my={2} textAlign="center" variant="h5">
          Please confirm
        </Typography>
        <Typography
          textAlign="center"
          fontWeight="400"
          variant="subtitle1"
          mb={6}
        >
          Are you sure you want delete this email address?
          <br /> <br />
          <Typography fontWeight="500">{email}</Typography>
        </Typography>
      </Box>
      <ModalActions
        secondAction="DELETE"
        onFirstAction={onCancel}
        onSecondAction={onDelete}
        secondActionStyle={{ padding: 0 }}
      />
    </>
  );
}
