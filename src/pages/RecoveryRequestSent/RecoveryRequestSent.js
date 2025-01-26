import { Box, Typography } from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  CustomButton,
  ErrorBox,
  FlexiblePopedRectangle,
  TinyButton,
} from "../../shared/components";
import { usePasswordRecoveryRequest, useQuery } from "../../shared/hooks";

export function RecoveryRequestSent() {
  const query = useQuery();
  const [email] = useMemo(() => [query.get("email"), query.get("token")], []);
  const { error, loading, recoverPassword } = usePasswordRecoveryRequest();

  const navigate = useNavigate();
  const goToSignIn = useCallback(() => {
    navigate("/sign-in");
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      recoverPassword(email);
    },
    [email]
  );

  return (
    <FlexiblePopedRectangle>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
      >
        <Typography
          fontSize="2.125rem"
          textAlign="center"
          variant="h3"
          className="opacity-500ms-anim"
          fontFamily="MinervaModern-Regular"
        >
          REQUEST SENT
        </Typography>
        <Typography
          mt={1}
          variant="subtitle1"
          fontWeight="400"
          maxWidth={400}
          textAlign="center"
        >
          You'll receive a link to reset your password at {email}
        </Typography>
        <Typography
          mt={1}
          variant="subtitle1"
          fontWeight="400"
          maxWidth={460}
          textAlign="center"
        >
          If you don't see the email within x minutes, check your spam or junk
          folder before submitting new request
        </Typography>
        <Box position="relative" width="100%" maxWidth={400}>
          <ErrorBox title="Password Recovery error" message={error} />
          <CustomButton
            disabled={loading}
            onClick={handleSubmit}
            type="submit"
            className="continue-button"
            sx={btnSx}
          >
            RESEND REQUEST
          </CustomButton>
        </Box>
        <TinyButton sx={{ top: "80%" }} onClick={goToSignIn}>
          SIGN IN
        </TinyButton>
      </Box>
    </FlexiblePopedRectangle>
  );
}

const btnSx = {
  fontSize: 20,
  letterSpacing: 2,
  width: "100%",
  maxWidth: 400,
  mt: -4,
};
