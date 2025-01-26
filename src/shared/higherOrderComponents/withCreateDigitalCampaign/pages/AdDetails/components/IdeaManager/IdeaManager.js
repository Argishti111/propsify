import { KeyboardArrowUp } from "@mui/icons-material";
import { Box, Collapse, Typography } from "@mui/material";
import React from "react";
import { Keyword } from "../../../../../../components";
import { SelectedItem } from "../../../../../../components/Form";

export function IdeaManager({
  data = [],
  fieldValues = [],
  fieldNames = [],
  handleChange,
  open,
  onClose,
}) {
  return (
    <Collapse in={open} timeout={500}>
      <Box display="flex" flexDirection="column">
        <Box
          onClick={onClose}
          sx={{
            cursor: "pointer",
          }}
          my={2}
          display="flex"
        >
          <KeyboardArrowUp htmlColor="#beb082" />
          <Typography color="#192231" fontSize={12}>
            Need some help getting started? Consider these suggested headlines
            based on your website
          </Typography>
        </Box>
        <Box>
          {data.map((item) => {
            return fieldValues.some((field) => field === item) ? (
              <SelectedItem
                mr={1}
                mb={1}
                onClose={() => {
                  for (let i = 0; i < fieldValues.length; i++) {
                    if (fieldValues[i] === item) {
                      handleChange(fieldNames[i])({ target: { value: "" } });
                      break;
                    }
                  }
                }}
                key={item}
                text={item}
              />
            ) : (
              <Keyword
                onClick={() => {
                  for (let i = 0; i < fieldValues.length; i++) {
                    if (!fieldValues[i]) {
                      handleChange(fieldNames[i])({ target: { value: item } });
                      break;
                    }
                  }
                }}
                key={item}
                data={{ displayName: item }}
              />
            );
          })}
        </Box>
      </Box>
    </Collapse>
  );
}
