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

export function InvalidRecoveryLink() {
  const query = useQuery();
  const [email] = useMemo(() => [query.get("email"), query.get("token")], []);

  const handleSend = useCallback(() => {
    navigate(`/recovery-request${window.location.search}`);
  }, []);

  const { error, loading, recoverPassword } =
    usePasswordRecoveryRequest(handleSend);

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
          INVALID LINK
        </Typography>
        <Typography mt={1} variant="subtitle1" fontWeight="700">
          {email}
        </Typography>
        <Typography
          mt={3}
          mb={2}
          variant="subtitle1"
          fontStyle="italic"
          fontWeight="400"
          textAlign="center"
        >
          Your reset link expired after sixty minutes or has already been used.
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
        <TinyButton sx={{ top: 64 }} onClick={goToSignIn}>
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
