import { Box, MenuItem } from "@mui/material";
import React from "react";
import { MuiSelect } from "../../../../../../../../shared/components/Form";
import { Filter } from "../Filter";

export function MinMaxFilter({
  title,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minItems = [],
  maxItems = [],
}) {
  return (
    <Filter
      py={4}
      borderBottom="1px solid #D8CFB4"
      alignItems="center"
      justifyContent="space-between"
      title={title}
    >
      <Box
        display="flex"
        flexWrap="nowrap"
        rowGap={1}
        gap={1.5}
        justifyContent="flex-end"
      >
        <MuiSelect
          value={minValue}
          onChange={(e) => onMinChange(e.target.value)}
          fullWidth={false}
          menuMaxHeight={320}
          formControlSx={{ width: { sm: "auto", xs: 500 } }}
          sx={{ width: { sm: 110, xs: "100%" } }}
          label="Min"
        >
          {minItems.map((item) => {
            return (
              <MenuItem
                disabled={item.id >= maxValue && maxValue !== 0}
                key={item.id}
                value={item.id}
              >
                {item.name}
              </MenuItem>
            );
          })}
        </MuiSelect>
        <MuiSelect
          value={maxValue}
          onChange={(e) => onMaxChange(e.target.value)}
          fullWidth={false}
          menuMaxHeight={320}
          formControlSx={{ width: { sm: "auto", xs: 500 } }}
          sx={{ width: { sm: 110, xs: "100%" } }}
          label="Max"
        >
          {maxItems.map((item) => (
            <MenuItem
              key={item.id}
              disabled={item.id <= minValue && minValue !== 0}
              value={item.id}
            >
              {item.name}
            </MenuItem>
          ))}
        </MuiSelect>
      </Box>
    </Filter>
  );
}
