import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, Typography } from "@mui/material";
import React from "react";
import { CustomButton } from "../../../../../../shared/components";
import { Input } from "../../../../../../shared/components/Form";

export function ActionBar() {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box>
        <Typography variant="subtitle2" fontStyle="italic">
          Total 2 users
        </Typography>
      </Box>
      <Box>
        <CustomButton
          sx={{ mr: 1, borderRadius: 1 }}
          color="primary"
          variant="outlined"
        >
          SIGN OUT
        </CustomButton>

        <CustomButton
          sx={{ mr: 1, borderRadius: 1 }}
          color="primary"
          variant="outlined"
        >
          RESET PASSWORD
        </CustomButton>
        <Input
          style={{ paddingRight: 0 }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  aria-label="toggle password visibility"
                  edge="end"
                >
                  <Search fontSize="small" htmlColor="#BEB082" />
                </IconButton>
              </InputAdornment>
            ),
          }}
          inputStyle={{ height: 15, fontSize: 15 }}
          placeholder="Search"
        />
      </Box>
    </Box>
  );
}
