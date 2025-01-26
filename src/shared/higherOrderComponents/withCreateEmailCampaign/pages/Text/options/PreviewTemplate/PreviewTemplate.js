import { Box, MenuItem, Typography } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { connect } from "react-redux";
import { changeEmailCampaignField } from "../../../../../../../redux";
import { MuiSelect } from "../../../../../../components/Form";
import { placeVariablesToContent } from "../../../../../../helpers";

const mapStateToProps = (state) => {
  return {
    template: state.emailMarketing.campaign.template,
    recipients: state.emailMarketing.campaign.recipients,
    selectedRecipient: state.emailMarketing.campaign.selectedRecipient,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeField: (key, value) => dispatch(changeEmailCampaignField(key, value)),
  };
};

export const PreviewTemplate = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ template, recipients, changeField, selectedRecipient }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    setDefaultRecipient();
  }, []);

  const setDefaultRecipient = useCallback(() => {
    if (recipients.length) {
      setValue(recipients[0].email);
      changeField("selectedRecipient", recipients[0]);
    }
  }, []);

  const handleChangeRecipient = useCallback((e) => {
    setValue(e.target.value);
    const selected = recipients.find((r) => r.email === e.target.value);
    changeField("selectedRecipient", selected);
  }, []);

  const content = useMemo(() => {
    if (!selectedRecipient) return template;

    return placeVariablesToContent(
      template,
      selectedRecipient.firstName,
      selectedRecipient.lastName
    );
  }, [selectedRecipient, template]);

  return (
    <Box>
      <Box py={2} display="flex" flexDirection="column">
        <Typography mb={1.5} variant="p" fontSize="0.75rem">
          Select a recipient from the file you uploaded to preview your email
        </Typography>
        <MuiSelect
          formControlSx={{ mt: 1, maxWidth: 400 }}
          onChange={handleChangeRecipient}
          value={value}
          fullWidth
          label=""
        >
          {recipients.map((recipient) => (
            <MenuItem
              key={recipient.email}
              onClick={() => changeField("selectedRecipient", recipient)}
              value={recipient.email}
            >
              {recipient.firstName} {recipient.lastName}
            </MenuItem>
          ))}
        </MuiSelect>
      </Box>
      <Box
        p={4}
        overflow="hidden"
        minHeight={577}
        sx={{ background: "#ECD9CC4D", wordBreak: "break-all" }}
      >
        <Typography mt={4} variant="p">
          <p dangerouslySetInnerHTML={{ __html: content }}></p>
        </Typography>
      </Box>
    </Box>
  );
});
