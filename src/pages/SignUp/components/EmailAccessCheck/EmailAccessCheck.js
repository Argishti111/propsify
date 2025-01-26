import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useCallback, useState } from "react";
import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { changeUserField } from "../../../../redux";
import { checkEmailAccess } from "../../../../services";
import { CustomButton } from "../../../../shared/components";
import { Input } from "../../../../shared/components/Form";
import { useNavigateWithCurrentSearch } from "../../../../shared/hooks";
import { validateEmail } from "../../../../shared/validators";

export function EmailAccessCheck() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigateWithCurrentSearch();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      checkEmailAccess(email)
        .then((res) => {
          dispatch(changeUserField("email", email));
          if (res.data.isRegistered) {
            setError(res.errorMessage);
            navigate(`/sign-in`);
          } else if (res.success) {
            navigate(`/sign-up/account`);
          } else {
            navigate(`/sign-up/join-waitlist`);
          }
        })
        .catch(() =>
          setError(
            "Failed to check the email address,\nplease check your internet connection or try later"
          )
        )
        .finally(() => setLoading(false));
    },
    [email]
  );

  const emailIsValid = useMemo(() => !validateEmail(email), [email]);

  // TODO: can be get back
  const goToSignIn = useCallback(() => {
    navigate("/sign-in");
  }, []);
  return (
    <>
      <form style={{ width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
        <Box
          px={2}
          maxWidth={400}
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Typography
            pt={4}
            fontSize="2.125rem"
            textAlign="center"
            variant="h3"
            className="opacity-500ms-anim"
            fontFamily="MinervaModern-Regular"
          >
            LET’S GET STARTED
          </Typography>
          <Typography mt={1} mb={7} variant="subtitle1" fontStyle="italic">
            Propsify is currently in a limited release.
          </Typography>
          <Input
            value={email}
            disabled={loading}
            error={error}
            onChange={(e) => setEmail(e.target.value)}
            label="Email address"
            style={{ maxWidth: 400, width: "100%" }}
            type="email"
            required
          />

          <CustomButton
            disabled={loading || emailIsValid}
            type="submit"
            className="continue-button"
            sx={buttonStyle}
          >
            CONTINUE
          </CustomButton>
        </Box>
      </form>

      {/*TODO: can be placed back
       <TinyButton style={{ marginTop: 72 }} onClick={goToSignIn}>
        SIGN IN
      </TinyButton> */}
    </>
  );
}

const buttonStyle = {
  fontSize: 20,
  letterSpacing: 2,
  maxWidth: 400,
  width: "100%",
};
