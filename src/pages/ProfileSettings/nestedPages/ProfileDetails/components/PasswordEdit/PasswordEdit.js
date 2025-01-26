import { Typography, Box } from "@mui/material";
import React, { useCallback, useState } from "react";
import {
  editUserPassword,
  sendPasswordRecover,
} from "../../../../../../services";
import {
  CustomButton,
  Success,
  TinyButton,
  TitleWithEdit,
} from "../../../../../../shared/components";
import { PasswordInput } from "../../../../../../shared/components/Form";
import { validatePassword } from "../../../../../../shared/validators";

export function PasswordEdit({ email }) {
  const [showFields, setShowFields] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOdPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [updaing, setUpdating] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const toggleFields = () => {
    setShowFields(!showFields);
  };

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (oldPassword.length === 0) {
        setOldPasswordError("Wrong password");
        return;
      }
      const error = validatePassword(newPassword);
      if (error.length) {
        setNewPasswordError(error);
        return;
      }
      setUpdating(true);
      editUserPassword(oldPassword, newPassword)
        .then((data) => {
          if (data.success) {
            setNewPassword("");
            setOdPassword("");
            setShowFields(false);
          } else {
            setOldPasswordError(data.errorMessage);
          }
        })
        .catch(() => setOldPasswordError("Failed to change password"))
        .finally(() => setUpdating(false));
    },
    [newPassword, oldPassword]
  );

  const handleResetPassword = useCallback(() => {
    sendPasswordRecover(email).then(() => {
      setEmailSent(true);
    });
    setTimeout(() => {
      setEmailSent(false);
    }, 4000);
  }, [email]);

  const handlePasswordChange = useCallback((e) => {
    const error = validatePassword(e.target.value);
    setNewPasswordError(error);
    setNewPassword(e.target.value);
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <Success
        open={emailSent}
        message={`You'll receive a link to reset your password at ${email}.`}
      />
      <TitleWithEdit
        type="button"
        mt={4}
        onIconClick={toggleFields}
        editable={!showFields}
        title="Password"
      />
      <Box
        mt={2}
        display="flex"
        flexDirection="column"
        gap={0.5}
        style={
          showFields
            ? { height: 200, opacity: 1 }
            : { height: 0, opacity: 0, marginTop: 0, pointerEvents: "none" }
        }
        sx={{ width: "100%", transition: "all 500ms" }}
      >
        <PasswordInput
          name="current-password"
          value={oldPassword}
          disabled={updaing}
          onChange={(e) => {
            setOdPassword(e.target.value);

            setOldPasswordError("");
          }}
          label="Current password"
          error={oldPasswordError}
          required
        />
        <PasswordInput
          name="new-password"
          value={newPassword}
          disabled={updaing}
          onChange={handlePasswordChange}
          label="New password"
          error={newPasswordError}
          required
        />
        <Box display="flex" flexDirection="row">
          <CustomButton disabled={updaing} type="submit" sx={{ px: 6 }}>
            SAVE
          </CustomButton>
          <CustomButton
            disabled={updaing}
            color="secondary"
            onClick={toggleFields}
            sx={{ px: 4, ml: 1 }}
          >
            CANCEL
          </CustomButton>
        </Box>
        <Typography mt={3} variant="p">
          Can't remember your current password?{" "}
          <TinyButton onClick={handleResetPassword} color="secondary">
            RESET YOUR PASSWORD
          </TinyButton>{" "}
        </Typography>
      </Box>
    </form>
  );
}
