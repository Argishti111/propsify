import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { joinTheWaitlist } from "../../../../services";
import { CustomButton } from "../../../../shared/components";
import { Input } from "../../../../shared/components/Form";
import { useQuery } from "../../../../shared/hooks";

export function JoinTheWaitlist() {
  const userEmail = useSelector((state) => state.user.email);
  const [email, setEmail] = useState(userEmail);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const query = useQuery();

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      setLoading(true);
      setError("");
      joinTheWaitlist(email)
        .then(() => {
          navigate("/waitlist-join-message");
        })
        .catch(() =>
          setError(
            "Failed to join the waitlist, please check your internet connection or try later"
          )
        )
        .finally(() => {
          setLoading(false);
          setTimeout(() => {
            setError("");
          }, 3000);
        });
    },
    [email]
  );

  return (
    <form style={{ width: "100%", maxWidth: 400 }} onSubmit={handleSubmit}>
      <Box px={2} display="flex" flexDirection="column" alignItems="center">
        <Typography
          pt={4}
          fontSize="2.125rem"
          textAlign="center"
          variant="h3"
          className="opacity-500ms-anim"
          fontFamily="MinervaModern-Regular"
        >
          CHECK BACK SOON!
        </Typography>
        <Typography mt={1} mb={7} variant="subtitle1" fontStyle="italic">
          Propsify is currently in a limited release.
        </Typography>
        <Input
          value={email}
          error={error}
          onChange={(e) => setEmail(e.target.value)}
          label="Email address"
          style={{ maxWidth: 400, width: "100%", marginBottom: 5 }}
          type="email"
          required
        />

        <Typography
          marginTop={1}
          display="inline-block"
          variant="p"
          fontSize={12}
          textAlign="center"
        >
          By choosing "Join the Waitlist”, you are agreeing that we are able to
          send you marketing material in an accordance with our Privacy Policy.
        </Typography>
        <CustomButton
          disabled={loading || !email}
          type="submit"
          className="continue-button"
          sx={buttonStyle}
        >
          JOIN THE WAITLIST
        </CustomButton>
      </Box>
    </form>
  );
}

const buttonStyle = {
  fontSize: 20,
  letterSpacing: 2,
  maxWidth: 400,
  width: "100%",
};
