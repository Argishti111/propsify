import { Box, Typography } from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router";
import { RouterContext } from "../../routing/AppRoutes";
import {
  CustomButton,
  ErrorBox,
  FlexiblePopedRectangle,
  TinyButton,
} from "../../shared/components";
import { Input } from "../../shared/components/Form";
import {
  useNavigateWithCurrentSearch,
  usePasswordRecoveryRequest,
} from "../../shared/hooks";
import "./ForgotPassword.css";

export function ForgotPassword() {
  const { route } = useContext(RouterContext);
  const [email, setEmail] = useState("");

  const { error, loading, recoverPassword, sent } =
    usePasswordRecoveryRequest();

  const navigateWithCurrentSearch = useNavigateWithCurrentSearch();
  const goToSignIn = useCallback(() => {
    navigateWithCurrentSearch("/sign-in");
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
      <form style={{ width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
        <fieldset disabled={loading}>
          {sent ? (
            <Box
              marginTop={3.7}
              px={2}
              display="flex"
              flexDirection="column"
              alignItems="center"
              className={sent ? "opacity-500ms-anim" : ""}
            >
              <Typography
                fontSize="2.125rem"
                marginBottom={2}
                textAlign="center"
                variant="h3"
                fontFamily="MinervaModern-Regular"
              >
                REQUEST SENT
              </Typography>

              <Typography
                display="flex"
                flexDirection="column"
                textAlign="center"
                maxWidth={456}
                width="100%"
                variant="body1"
              >
                You'll receive a link to reset your password at
                <br /> {email}.<br />{" "}
                <ErrorBox
                  alignSelf="center"
                  width="100%"
                  maxWidth={400}
                  marginTop={1}
                  title="Recover Error:"
                  message={error}
                />
                {/* <br /> If you don't see the email within x minutes, check your
                spam or junk folder before submitting a new request. */}
              </Typography>
              {/* <CustomButton
                disabled={loading}
                type="submit"
                className="send-request-button "
                sx={{ fontSize: 20, letterSpacing: 2, width: 400 }}
              >
                RESEND REQUEST
              </CustomButton> */}
            </Box>
          ) : (
            <Box
              marginTop={3.7}
              px={1}
              display="flex"
              flexDirection="column"
              alignItems="center"
              className={!sent ? "opacity-500ms-anim" : ""}
            >
              <Typography
                fontSize="2.125rem"
                marginBottom={2}
                textAlign="center"
                variant="h3"
                fontFamily="MinervaModern-Regular"
              >
                FORGOT PASSWORD
              </Typography>
              <Typography variant="body1" marginBottom={6}>
                Enter your email address
              </Typography>
              <Input
                disabled={loading}
                type="email"
                required
                error={error}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", maxWidth: 400, marginBottom: 5 }}
                label="Email address"
              />
              <CustomButton
                disabled={loading}
                type="submit"
                className="send-request-button"
                sx={{
                  fontSize: "1.25rem",
                  letterSpacing: 2,
                  width: "100%",
                  maxWidth: 400,
                }}
              >
                SEND REQUEST
              </CustomButton>
            </Box>
          )}
        </fieldset>
      </form>
      <Box
        position="relative"
        maxWidth={400}
        width="100%"
        marginTop={sent ? 2 : 21}
        display="flex"
        justifyContent="center"
      >
        {route.from === route.to ? (
          <TinyButton onClick={goToSignIn}>SIGN IN</TinyButton>
        ) : (
          <>
            <Box
              className="forgot-pass-from"
              component="span"
              position="absolute"
            >
              <Typography variant="p">Don't have an account yet?</Typography>
              <TinyButton style={{ marginLeft: 8 }}>SIGN IN</TinyButton>
            </Box>
            <Box
              className="forgot-pass-to"
              component="span"
              position="absolute"
            >
              <TinyButton onClick={goToSignIn}>SIGN IN</TinyButton>
            </Box>
          </>
        )}
      </Box>
    </FlexiblePopedRectangle>
  );
}
