import { Box, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../../../components";
import { Input } from "../../../../../../../../components/Form";

export function VerifyEmail({ onSubmit, value, onChange, error, sent }) {
  return (
    <Box maxWidth={400} display="flex" flexDirection="column">
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(e);
        }}
        display="flex"
      >
        <Box mr={1} width="100%">
          <Input
            value={value}
            error={error}
            onChange={onChange}
            style={{ width: "100%" }}
            label="Sender’s email address"
            required
          />
        </Box>
        <CustomButton type="submit" sx={{ height: 46, width: 180 }}>
          VERIFY EMAIL
        </CustomButton>
      </Box>
      {sent && !error && (
        <Typography
          alignSelf="flex-end"
          variant="p"
          fontSize="13px"
          color="#E55656"
        >
          Verify your sender email address to continue setting up an email
          marketing campaign
        </Typography>
      )}
    </Box>
  );
}
