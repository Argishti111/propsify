import { Grid } from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserField } from "../../../../redux";
import { editUserProfile } from "../../../../services";
import { Input } from "../../../../shared/components/Form";
import { DeleteAccount, EmailEdit, PasswordEdit } from "./components";
import { ProfileImage } from "./components";

export function ProfileDetails() {
  const {
    firstName: oldFirstName,
    lastName: oldLastName,
    picture,
    email,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(oldFirstName);
  const [lastName, setLastName] = useState(oldLastName);

  const handleChange = (firstName, lastName) => {
    editUserProfile({ firstName, lastName }).then((data) => {
      if (data.success) {
        dispatch(changeUserField("firstName", firstName));
        dispatch(changeUserField("lastName", lastName));
      }
    });
  };

  const handleChangeEmail = useCallback((newEmail) => {
    dispatch(changeUserField("email", newEmail));
  }, []);

  return (
    <Grid
      height="calc(100vh - 216px)"
      p={4}
      px={{ md: 4, sm: 2, xs: 2 }}
      overflow="auto !important"
      container
      sx={{
        flexFlow: {
          md: "row",
          sm: "column",
          xs: "column",
        },
      }}
    >
      <Grid
        display={{ md: "none", sm: "flex", xs: "flex" }}
        flexDirection="column"
        xl={5}
        lg={5}
        md={6}
        sm={12}
        xs={12}
        item
        alignItems={{ md: "flex-end", sm: "flex-start" }}
      >
        <ProfileImage logoUrl={picture} />
      </Grid>
      <Grid
        mt={2}
        gap={0.5}
        display="flex"
        flexDirection="column"
        lg={7}
        xl={7}
        md={6}
        sm={12}
        xs={12}
        item
      >
        <Input
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            if (!!e.target.value) {
              handleChange(e.target.value, lastName);
            }
          }}
          required
          label="First name"
        />
        <Input
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            if (!!e.target.value) {
              handleChange(firstName, e.target.value);
            }
          }}
          required
          label="Last name"
        />
        <EmailEdit email={email} onEmailChange={handleChangeEmail} />
        <PasswordEdit email={email} />
        {/* <DeleteAccount /> */}
      </Grid>
      <Grid
        display={{ md: "flex", sm: "none", xs: "none" }}
        flexDirection="column"
        xl={5}
        lg={5}
        md={6}
        sm={12}
        xs={12}
        item
        maxHeight={240}
        alignItems={{ md: "flex-end", sm: "flex-start" }}
      >
        <ProfileImage logoUrl={picture} />
      </Grid>
    </Grid>
  );
}
