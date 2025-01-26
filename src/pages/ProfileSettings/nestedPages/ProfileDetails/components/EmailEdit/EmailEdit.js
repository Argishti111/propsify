import { Typography, Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import { editUserEmail } from "../../../../../../services";
import {
  CustomButton,
  TitleWithEdit,
} from "../../../../../../shared/components";
import { Input, PasswordInput } from "../../../../../../shared/components/Form";

export function EmailEdit({ email, onEmailChange }) {
  const [showFields, setShowFields] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [changing, setChanging] = useState(false);
  const [error, setError] = useState("");

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setChanging(true);
      setError("");
      editUserEmail(oldPassword, newEmail)
        .then((data) => {
          if (data.success) {
            setNewEmail("");
            setShowFields(false);
            onEmailChange(newEmail);
          } else {
            setError(data.errorMessage);
          }
          setOldPassword("");
        })
        .finally(() => {
          setChanging(false);
        });
    },
    [oldPassword, newEmail, setOldPassword]
  );

  return (
    <form onSubmit={handleSubmit}>
      <TitleWithEdit
        type="button"
        mt={4}
        onIconClick={toggleFields}
        editable={!showFields}
        title="Email Address"
      />
      <Typography variant="body1">
        Your email address is <b>{email}</b>
      </Typography>
      <Box
        mt={2}
        display="flex"
        gap={0.5}
        flexDirection="column"
        style={
          showFields
            ? { height: 160, opacity: 1 }
            : { height: 0, opacity: 0, marginTop: 0, pointerEvents: "none" }
        }
        sx={{ width: "100%", transition: "all 500ms" }}
      >
        <Input
          disabled={changing}
          error={error}
          onChange={(e) => setNewEmail(e.target.value)}
          value={newEmail}
          type="email"
          label="New email address"
          required
          name="email"
        />
        <PasswordInput
          disabled={changing}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          label="Current password"
          name="password"
          required
        />
        <Box>
          <CustomButton type="submit" sx={{ px: 4 }}>
            UPDATE
          </CustomButton>
          <CustomButton
            onClick={toggleFields}
            sx={{ px: 4, ml: 1, background: "transparent" }}
          >
            CANCEL
          </CustomButton>
        </Box>
      </Box>
    </form>
  );
}
