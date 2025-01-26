import { MenuItem, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import { setEmailAddressManagerOpen } from "../../../../../../../../../redux";
import { MuiSelect } from "../../../../../../../../components/Form";

const mapDispatchToProps = (dispatch) => {
  return {
    onOpenManager: () => dispatch(setEmailAddressManagerOpen(true)),
  };
};

export const SelectEmail = connect(
  null,
  mapDispatchToProps
)(({ onOpenManager, emails, selected, onSelect }) => {
  return (
    <>
      <Typography
        mb={1}
        mt={-1}
        sx={{ cursor: "pointer" }}
        alignSelf="flex-end"
        variant="p"
        fontSize="0.813rem"
        color="#BEB082"
        onClick={onOpenManager}
      >
        Add a new sender email address
      </Typography>
      <MuiSelect
        onChange={(e) => {
          const selectedEmail = emails.find(
            (email) => email.id === e.target.value
          );
          onSelect(e.target.value, selectedEmail.emailAddress);
        }}
        value={selected}
        fullWidth
        label="Sender's email address"
        required
      >
        {emails.map((e) => {
          return (
            <MenuItem key={e.id} value={e.id}>
              {e.emailAddress}
            </MenuItem>
          );
        })}
      </MuiSelect>
    </>
  );
});
