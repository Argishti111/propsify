import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { connect, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { changeUserField, clearErrors, fetchRegister } from "../../../../redux";
import { RouterContext } from "../../../../routing/AppRoutes";
import {
  CustomButton,
  ErrorBox,
  TinyButton,
} from "../../../../shared/components";
import { Input, PasswordInput } from "../../../../shared/components/Form";
import { useNavigateWithCurrentSearch } from "../../../../shared/hooks";
import { validatePassword } from "../../../../shared/validators";

const requirements = {
  firstNameMax: 100,
  lastNameMax: 200,
  emailMax: 150,
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearErrors: () => dispatch(clearErrors()),
    register: (data, callback) => dispatch(fetchRegister(data, callback)),
  };
};

const mapStateToProps = (state) => {
  return {
    id: state.user.id,
    email: state.user.email,
    loading: state.user.registerLoading,
    error: state.user.registerError,
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
};

export const CreateAccount = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ register, loading, error, clearErrors, email }) => {
  const [state, dispatch] = useReducer(reducer, {
    email,
    password: "",
    firstName: "",
    lastName: "",
    firstNameError: "",
    lastNameError: "",
    emailError: "",
  });
  const { route } = useContext(RouterContext);
  const navigateWithCurrentSearch = useNavigateWithCurrentSearch();
  const navigate = useNavigate();
  const [emailChecked, setEmailChecked] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState("");

  useEffect(() => {
    if (!email) {
      //TODO: remove this after prod
      navigateWithCurrentSearch("/sign-in");
    }
    return clearErrors;
  }, []);

  const handleChange = (key) => {
    return (e) => {
      dispatch({ type: "change", payload: { key, value: e.target.value } });
    };
  };

  const setFirstNameError = useCallback(() => {
    dispatch({
      type: "change",
      payload: {
        key: `firstNameError`,
        value: `Should not exceed ${requirements.firstNameMax} characters`,
      },
    });
  }, []);

  const setLastNameError = useCallback(() => {
    dispatch({
      type: "change",
      payload: {
        key: `lastNameError`,
        value: `Should not exceed ${requirements.lastNameMax} characters`,
      },
    });
  }, []);

  const setEmailError = useCallback(() => {
    dispatch({
      type: "change",
      payload: {
        key: `emailError`,
        value: `Should not exceed ${requirements.emailMax} characters`,
      },
    });
  }, []);

  const validateFields = useCallback(() => {
    let invalid = false;
    if (requirements.firstNameMax < state.firstName.length) {
      invalid = true;
      setFirstNameError();
    }
    if (requirements.lastNameMax < state.lastName.length) {
      invalid = true;
      setLastNameError();
    }
    if (requirements.emailMax < state.email.length) {
      invalid = true;
      setEmailError();
    }
    return invalid;
  }, [state]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (validateFields()) {
        return;
      }
      const error = validatePassword(state.password);
      if (error.length) {
        setNewPasswordError(error);
        return;
      }
      register(state, () => {
        navigateWithCurrentSearch("/sign-up/payment");
      });
    },
    [state]
  );

  const reduxDispatch = useDispatch();
  const goToSignIn = useCallback(() => {
    reduxDispatch(changeUserField("email", ""));
    navigate("/sign-in");
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box px={2} display="flex" flexDirection="column" alignItems="center">
          <Typography
            pt={4}
            fontSize="2.125rem"
            textAlign="center"
            variant="h3"
            className="opacity-500ms-anim"
            fontFamily="MinervaModern-Regular"
          >
            CREATE ACCOUNT
          </Typography>
          <ErrorBox
            // alignSelf="center"
            maxWidth={400}
            width="100%"
            mt={2}
            title="Registration Error:"
            message={error}
          />
          <Box
            pt={7}
            className="sign-up-form"
            position="relative"
            maxWidth={400}
            width="100%"
          >
            <Box
              className="opacity-500ms-anim"
              display="flex"
              justifyContent="space-between"
              sx={{
                flexDirection: {
                  md: "row",
                  sx: "column",
                  xs: "column",
                },
              }}
            >
              <Box marginBottom={1.2} sx={{ mr: { md: 1.25, sx: 0, xs: 0 } }}>
                <Input
                  disabled={loading}
                  onChange={handleChange("firstName")}
                  required
                  error={state.firstNameError}
                  sx={{
                    width: {
                      md: "auto",
                      sx: "100%",
                      xs: "100%",
                    },
                  }}
                  label="First name"
                />
              </Box>
              <Box marginBottom={1.2}>
                <Input
                  sx={{
                    width: {
                      md: "auto",
                      sx: "100%",
                      xs: "100%",
                    },
                  }}
                  disabled={loading}
                  error={state.lastNameError}
                  onChange={handleChange("lastName")}
                  required
                  label="Last name"
                />
              </Box>
            </Box>
            <Input
              disabled={loading || true} // TODO: remove true in after production
              required
              onChange={handleChange("email")}
              value={state.email}
              error={state.emailError}
              type="email"
              style={{ maxWidth: 400, width: "100%", marginBottom: 5 }}
              label="Email address"
            />
            <PasswordInput
              disabled={loading}
              error={newPasswordError}
              onChange={(e) => {
                const error = validatePassword(e.target.value);
                setNewPasswordError(error);
                handleChange("password")(e);
              }}
              required
              style={{ maxWidth: 400, width: "100%" }}
            />
            <Box
              maxWidth={400}
              width="100%"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              className="opacity-500ms-anim"
            >
              <FormControlLabel
                disabled={loading}
                control={
                  <Checkbox
                    color="primary"
                    icon={<CheckBoxOutlineBlank htmlColor="#BEB082" />}
                    value={emailChecked}
                    onChange={(e) => setEmailChecked((prev) => !prev)}
                  />
                }
                label={
                  <Typography marginTop={1} fontSize={12} variant="p">
                    Sign up for emails to get updates from Propsify on features,
                    offers, and your Member benefits
                  </Typography>
                }
              />
            </Box>
            <Typography
              marginTop={3.8}
              display="inline-block"
              variant="p"
              fontSize={12}
              textAlign="center"
            >
              By choosing "Agree & Continue", you agree to our Terms of Use and
              Privacy Policy including the Mandatory Arbitration and other terms
              on bringing/resolving disputes
            </Typography>
            <CustomButton
              disabled={
                loading ||
                !state.password ||
                !state.email ||
                !state.firstName ||
                !state.lastName
              }
              type="submit"
              className="continue-button"
              sx={{
                fontSize: 20,
                letterSpacing: 2,
                maxWidth: 400,
                width: "100%",
              }}
            >
              AGREE & CONTINUE
            </CustomButton>
          </Box>
        </Box>

        <Box
          position="relative"
          maxWidth={400}
          width="100%"
          mt={10}
          pb={2}
          display="flex"
          justifyContent="center"
        >
          {route.from === route.to ? (
            <Box display="flex" justifyContent="center">
              <Typography variant="p">Already have an account?</Typography>
              <TinyButton onClick={goToSignIn} style={{ marginLeft: 8 }}>
                SIGN IN
              </TinyButton>
            </Box>
          ) : (
            <>
              <Box
                className="opacity-500ms-anim-reverse"
                component="span"
                position="absolute"
              >
                <Typography variant="p">Already have an account?</Typography>
                <TinyButton>SIGN IN</TinyButton>
              </Box>

              <Box
                className="opacity-500ms-anim"
                component="span"
                position="absolute"
              >
                <Typography variant="p">Already have an account?</Typography>
                <TinyButton onClick={goToSignIn} style={{ marginLeft: 8 }}>
                  SIGN IN
                </TinyButton>
              </Box>
            </>
          )}
        </Box>
      </form>
    </>
  );
});
