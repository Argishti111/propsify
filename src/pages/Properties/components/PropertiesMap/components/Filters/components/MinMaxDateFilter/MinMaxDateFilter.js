import { Box } from "@mui/material";
import React, { useState } from "react";
import { DatePicker } from "../../../../../../../../shared/components/Form";
import { Filter } from "../Filter";

export function MinMaxDateFilter({
  title,
  startPeriod,
  endPeriod,
  onStartDateChange,
  onEndDateChange,
}) {
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);
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
        <DatePicker
          label="Start"
          shrink
          minDate={new Date(1750, 0)}
          maxDate={endPeriod ?? Date.now()}
          open={startOpen}
          onOpen={() => setStartOpen(true)}
          onClose={() => setStartOpen(false)}
          openTo="openYear"
          inputFormat="yyyy"
          inputStyle={dateInputStyle}
          onChange={onStartDateChange}
          value={startPeriod}
          views={["year"]}
        />
        <DatePicker
          label="End"
          shrink
          open={endOpen}
          onOpen={() => setEndOpen(true)}
          onClose={() => setEndOpen(false)}
          openTo="openYear"
          inputFormat="yyyy"
          minDate={startPeriod ?? 1750}
          maxDate={Date.now()}
          inputStyle={dateInputStyle}
          onChange={onEndDateChange}
          value={endPeriod}
          closeOnSelect={true}
          views={["year"]}
        />
      </Box>
    </Filter>
  );
}

const dateInputStyle = {
  padding: "3px 17px 3px 9px",
};
