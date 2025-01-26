import { Typography } from "@mui/material";
import React, { useState } from "react";
import {
  CustomButton,
  ErrorBox,
  SectionTitle,
} from "../../../../../shared/components";
import { Input } from "../../../../../shared/components/Form";

export function AddNewSenderEmailAddress({ onNewEmailAdded, error }) {
  const [email, setEmail] = useState("");

  return (
    <>
      <SectionTitle>ADD A NEW SENDER EMAIL ADDRESS</SectionTitle>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onNewEmailAdded(email);
        }}
      >
        <ErrorBox mb={1.5} title="Failed" message={error} />
        <Typography variant="body1" mb={4}>
          Add a new sender email address to use for email marketing. A sender
          email address is shown in the “From” field of an email so that a
          recipient can identify the sender.
        </Typography>
        <Input
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          label=""
          sx={{ width: "100%" }}
        />
        <CustomButton type="submit" sx={{ mt: 2, width: "100%" }}>
          ADD EMAIL ADDRESS
        </CustomButton>
      </form>
    </>
  );
}
