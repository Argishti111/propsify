import { Box, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import { addAdAcount } from "../../../../../../services";
import { ErrorBox, ModalActions } from "../../../../../../shared/components";
import { Input, MuiSelect } from "../../../../../../shared/components/Form";
import { validateEmail } from "../../../../../../shared/validators";
import { CreateAccountProgress } from "../CreateAccountProgress";

const timeZones = [
  { id: "America/New_York", name: "Los Angeles, CA, USA(GMT-8)" },
];
const currencies = [{ id: "USD", name: "USD" }];

export function CreateAccount({
  page,
  setModalLoading,
  onClose,
  goNext,
  token,
  timeZone,
  setTimeZone,
  currencyCode,
  setCurrencyCode,
  email,
  setEmail,
  descriptiveName,
  setDescriptiveName,
}) {
  const [error, setError] = useState("");

  const handleCreateAccount = () => {
    setModalLoading(true);
    addAdAcount({
      timeZone,
      currencyCode,
      descriptiveName,
      email,
      id: token.id,
      accessToken: token.accessToken,
    })
      .then((res) => {
        if (res.success) {
          token.id = res.data.accountId;
          goNext();
          return;
        }
        setError(res.errorMessage);
      })
      .catch(() => {
        setError("Error");
      })
      .finally(() => {
        setModalLoading(false);
      });
  };

  return (
    <>
      <Box
        sx={{ overflowY: "scroll" }}
        display="flex"
        flexDirection="column"
        px={{ md: 5, sm: 1, xs: 1 }}
        py={5}
      >
        <CreateAccountProgress page={page} />
        <Typography maxWidth={414} />
        <Typography
          textAlign="center"
          variant="subtitle1"
          fontStyle="italic"
          mb={6}
          mt={4}
        >
          First create your Google Ads account
        </Typography>
        <ErrorBox
          mb={2}
          mt={-3}
          title="FAILED TO CREATE ACCOUNT"
          message={error}
        />
        <Input
          value={descriptiveName}
          onChange={(e) => setDescriptiveName(e.target.value)}
          label="Ad account name"
          required
        />
        <Input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 1 }}
          label="Email"
          required
        />
        <Typography ml={1.5} mb={1.5} fontSize="0.75rem" color="#192231CC">
          This email needs to be the same email you used to log in to Google.
        </Typography>
        <MuiSelect
          onChange={(e) => setTimeZone(e.target.value)}
          value={timeZone}
          fullWidth
          label="Time zone"
          required
        >
          {timeZones.map((tz) => {
            return (
              <MenuItem key={tz.id} value={tz.id}>
                {tz.name}
              </MenuItem>
            );
          })}
        </MuiSelect>
        <MuiSelect
          formControlSx={{ mt: 2 }}
          onChange={(e) => setCurrencyCode(e.target.value)}
          value={currencyCode}
          fullWidth
          label="Currency"
          required
        >
          {currencies.map((c) => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            );
          })}
        </MuiSelect>
        <Typography ml={1.5} mt={1} fontSize="0.75rem" color="#192231CC">
          Currency cannot be changed after it has been set.{" "}
        </Typography>
      </Box>
      <ModalActions
        onFirstAction={onClose}
        onSecondAction={handleCreateAccount}
        secondActionDisabled={
          !validateEmail(email) ||
          !currencyCode ||
          !descriptiveName ||
          !timeZone
        }
      />
    </>
  );
}
