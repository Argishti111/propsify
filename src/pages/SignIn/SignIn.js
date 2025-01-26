import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router";
import { clearErrors, fetchLogin } from "../../redux";
import { RouterContext } from "../../routing/AppRoutes";
import {
  CustomButton,
  ErrorBox,
  PopedRectangle,
  TinyButton,
} from "../../shared/components";
import { Input, PasswordInput } from "../../shared/components/Form";
import { useNavigateWithCurrentSearch, useQuery } from "../../shared/hooks";
import "./SignIn.css";

const mapDispatchToProps = (dispatch) => {
  return {
    login: (data, callback) => dispatch(fetchLogin(data, callback)),
    clearErrors: () => dispatch(clearErrors()),
  };
};
const mapStateToProps = (state) => {
  return {
    loading: state.user.loginLoading,
    userEmail: state.user.email,
    error: state.user.loginError,
  };
};
export const SignIn = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ login, loading, error, clearErrors, userEmail }) => {
  const { route } = useContext(RouterContext);
  const query = useQuery();
  const navigateWithCurrentSearch = useNavigateWithCurrentSearch();
  const navigate = useNavigate();
  const [email, setEmail] = useState(userEmail);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  useEffect(() => {
    if (!email) {
      //TODO: remove this after prod
      navigateWithCurrentSearch("/sign-up/email-access");
    }
    return clearErrors;
  }, []);

  const goToForgotPassword = useCallback(() => {
    navigateWithCurrentSearch("/forgot-password");
  }, []);

  const goToSignUp = useCallback(() => {
    //TODO: get this back later navigate("/sign-up/account");
    navigateWithCurrentSearch("/sign-up/email-access");
  }, []);

  const signIn = useCallback(() => {
    login({ email, password, rememberMe }, (res) => {
      if (res.data.hasPayment) {
        const returnUrl = query.get("returnUrl");
        if (returnUrl) {
          setTimeout(() => {
            navigate(returnUrl);
          }, 0);
          return;
        }
        navigate("/home");
      } else {
        navigateWithCurrentSearch("/sign-up/payment");
      }
    });
  }, [email, password]);

  const fromSignUp = useMemo(() => route.from.includes("/sign-up"), [route]);
  return (
    <PopedRectangle
      display="flex"
      flexDirection="column"
      maxHeight={{ md: "none", sm: "none", xs: 560 }}
      justifyContent={{ md: "center", sm: "start", xs: "start" }}
      alignItems="center"
      py={2}
      overflow="hidden"
    >
      <Box
        marginTop={3.7}
        display="flex"
        flexDirection="column"
        alignItems="center"
        px={2}
      >
        <Typography
          fontSize="2.125rem"
          marginBottom={7}
          textAlign="center"
          variant="h3"
          className="opacity-500ms-anim"
          fontFamily="MinervaModern-Regular"
        >
          SIGN IN
        </Typography>
        <Box
          className={`sign-in-form ${
            fromSignUp ? "sign-in-form-animated" : ""
          }`}
          position="relative"
          maxWidth={400}
        >
          <ErrorBox
            marginTop={3}
            marginBottom={-5}
            title="Authentication error"
            message={error}
          />
          <Box
            marginBottom={1.2}
            display="flex"
            justifyContent="space-between"
            className={fromSignUp ? "opacity-500ms-anim-reverse" : "opacity-0"}
          >
            <Box marginRight={1.25}>
              <Input
                style={{ pointerEvents: "none" }}
                required
                readOnly
                label="First name"
              />
            </Box>
            <Box>
              <Input
                style={{ pointerEvents: "none" }}
                readOnly
                required
                label="Last name"
              />
            </Box>
          </Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              signIn();
            }}
          >
            <Input
              required
              disabled={loading || true} //TODO: remove this after prod
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{ maxWidth: 400, width: "100%", marginBottom: 5 }}
              label="Email address"
            />
            <PasswordInput
              disabled={loading}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
              style={{ maxWidth: 400, width: "100%" }}
            />
            <Box
              width={"100%"}
              maxWidth={400}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className="opacity-500ms-anim"
            >
              <FormControlLabel
                disabled={loading}
                control={
                  <Checkbox
                    sx={{
                      color: "#beb082",
                    }}
                    onChange={() => setRememberMe((prev) => !prev)}
                    defaultChecked
                  />
                }
                label={
                  <Typography sx={{ whiteSpace: "nowrap" }} variant="p">
                    Keep me signed in
                  </Typography>
                }
              />
              <TinyButton
                sx={{ whiteSpace: "nowrap" }}
                disabled={loading}
                onClick={goToForgotPassword}
              >
                FORGOT PASSWORD
              </TinyButton>
            </Box>
            <CustomButton
              disabled={loading}
              type="submit"
              // onClick={signIn}
              className={`continue-button ${
                route.from === "/forgot-password"
                  ? "continue-button-animated"
                  : ""
              }`}
              sx={{ width: "100%", fontSize: 20, letterSpacing: 2 }}
            >
              CONTINUE
            </CustomButton>
          </form>
        </Box>
      </Box>
      {/* animate */}
      <Box
        position="relative"
        width={400}
        marginTop={6.4}
        display="flex"
        justifyContent="center"
      >
        {route.from === route.to ? (
          <Box display="flex" justifyContent="center">
            <Typography variant="p">Don't have an account yet?</Typography>
            <TinyButton onClick={goToSignUp} style={{ marginLeft: 8 }}>
              SIGN UP
            </TinyButton>
          </Box>
        ) : route.from === "/forgot-password" ? (
          <>
            <Box className="from-forgot" component="span" position="absolute">
              <TinyButton>SIGN UP</TinyButton>
            </Box>

            <Box
              className="forgot-to-sign-in"
              component="span"
              position="absolute"
            >
              <Typography variant="p">Don't have an account yet?</Typography>
              <TinyButton onClick={goToSignUp} style={{ marginLeft: 8 }}>
                SIGN UP
              </TinyButton>
            </Box>
          </>
        ) : (
          <>
            <Box
              className="opacity-500ms-anim-reverse"
              component="span"
              position="absolute"
            >
              <Typography variant="p">Already have an account?</Typography>
              <TinyButton>SIGN UP</TinyButton>
            </Box>

            <Box
              className="opacity-500ms-anim"
              component="span"
              position="absolute"
            >
              <Typography variant="p">Don't have an account yet?</Typography>
              <TinyButton onClick={goToSignUp} style={{ marginLeft: 8 }}>
                SIGN UP
              </TinyButton>
            </Box>
          </>
        )}
      </Box>
    </PopedRectangle>
  );
});
