import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { checkRecoveryToken, recoverPassword } from "../../services";
import {
  CustomButton,
  ErrorBox,
  FlexiblePopedRectangle,
  Loading,
  PopedRectangle,
} from "../../shared/components";
import { PasswordInput } from "../../shared/components/Form";
import { useQuery } from "../../shared/hooks";
import { validatePassword } from "../../shared/validators";
import "./PasswordRecover.css";

export const PasswordRecover = () => {
  const query = useQuery();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [checkingToken, setCheckingToken] = useState(true);

  const [email, token] = useMemo(
    () => [query.get("email"), query.get("token")],
    []
  );
  useEffect(() => {
    if (!token || !email) {
      navigate("/sign-in");
      return;
    }
    checkToken();
  }, []);

  const checkToken = useCallback(() => {
    checkRecoveryToken(token)
      .then((res) => {
        if (!res.success) {
          navigate(`/invalid-recovery${window.location.search}`);
        }
      })
      .catch(() => {
        navigate(`/invalid-recovery${window.location.search}`);
      })
      .finally(() => {
        setTimeout(() => {
          setCheckingToken(false);
        }, 0);
      });
  }, []);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setError("");
      const error = validatePassword(password);
      if (error.length) {
        setError(error);
        return;
      }
      setLoading(true);
      recoverPassword(password, query.get("token"))
        .then((data) => {
          if (data.success) {
            navigate("/sign-in");
            return;
          } else {
            navigate(`/invalid-recovery${window.location.search}`);
          }
        })
        .catch((e) => {
          setError("Something went wrong");
        })
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    },
    [password]
  );

  const handlePasswordChange = useCallback((e) => {
    const error = validatePassword(e.target.value);
    setValidationError(error);
    setPassword(e.target.value);
  }, []);

  if (checkingToken) {
    return (
      <FlexiblePopedRectangle>
        <Loading />
      </FlexiblePopedRectangle>
    );
  }

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
          CHOOSE A NEW PASSWORD
        </Typography>
        <Typography mb={5} mt={1} variant="subtitle1" fontWeight="700">
          {email}
        </Typography>
        <Box position="relative" width="100%" maxWidth={400}>
          <ErrorBox
            mt={-3}
            mb={2}
            title="Password Recovery error"
            message={error}
          />
          <form onSubmit={handleSubmit}>
            <PasswordInput
              disabled={loading}
              value={password}
              onChange={handlePasswordChange}
              error={validationError}
              required
              style={{ width: "100%", maxWidth: 400 }}
            />
            <CustomButton
              disabled={loading}
              type="submit"
              className="continue-button"
              sx={btnSx}
            >
              CONTINUE
            </CustomButton>
          </form>
        </Box>
      </Box>
    </FlexiblePopedRectangle>
  );
};

const btnSx = {
  fontSize: 20,
  letterSpacing: 2,
  width: "100%",
  maxWidth: 400,
  mt: -4,
};
