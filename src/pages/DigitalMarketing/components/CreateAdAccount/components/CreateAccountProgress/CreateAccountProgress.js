import React from "react";
import { Box } from "@mui/material";
import { CheckItem } from "../../../../../../shared/components";

export function CreateAccountProgress({ page }) {
  return (
    <Box
      maxWidth={305}
      alignSelf="center"
      alignItems="center"
      display="flex"
      justifyContent="space-between"
    >
      <CheckItem checked={page > 1}>Create&nbsp;account</CheckItem>
      <Box
        top={-12}
        position="relative"
        borderBottom="1px solid #BEB082"
        width={{ md: 180, sm: 100, xs: 100 }}
        mr={-2}
        ml={-3}
      />
      <CheckItem checked={page == 3} disabled={page == 1}>
        Setup&nbsp;billing
      </CheckItem>
    </Box>
  );
}
