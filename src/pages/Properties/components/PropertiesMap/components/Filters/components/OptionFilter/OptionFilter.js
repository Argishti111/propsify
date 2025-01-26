import { CheckBoxOutlineBlank } from "@mui/icons-material";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { Filter } from "../Filter";
import { Option } from "./components";

const items = [
  { id: null, name: "ANY" },
  { id: 1, name: "1+" },
  { id: 2, name: "2+" },
  { id: 3, name: "3+" },
  { id: 4, name: "4+" },
  { id: 5, name: "5+" },
];

export function OptionFilter({
  title,
  useExact,
  selected,
  onSelect,
  onExactChange,
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
        justifyContent="flex-end"
        flexDirection="row"
        flexWrap="wrap"
        gap={1}
        alignSelf="flex-start"
      >
        {items.map((item) => (
          <Option
            key={item.id}
            id={item.id}
            name={item.name}
            onSelect={onSelect}
            isSelected={selected === item.id}
          />
        ))}
      </Box>
      <FormControlLabel
        sx={{ ml: 5.5 }}
        checked={useExact}
        onChange={onExactChange}
        control={
          <Checkbox
            color="primary"
            icon={<CheckBoxOutlineBlank htmlColor="#BEB082" />}
          />
        }
        label={
          <Typography variant="body2" display="block" fontStyle="italic">
            Use exact match
          </Typography>
        }
      />
    </Filter>
  );
}
