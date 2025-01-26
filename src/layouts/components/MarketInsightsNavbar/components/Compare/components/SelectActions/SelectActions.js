import { ListItemText } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../../shared/components";
import { styles } from "./styles";

export function SelectActions({ apply, clear }) {
  return (
    <ListItemText sx={styles.itemContainer}>
      <CustomButton
        onClick={apply}
        sx={{
          width: "50%",
          letterSpacing: "0.08rem",
          paddingTop: "7px",
          paddingBottom: "5px",
        }}
      >
        Apply
      </CustomButton>
      <CustomButton
        onClick={clear}
        sx={{
          width: "50%",
          letterSpacing: "0.08rem",
          paddingTop: "7px",
          paddingBottom: "5px",
        }}
        color="secondary"
      >
        Clear
      </CustomButton>
    </ListItemText>
  );
}
