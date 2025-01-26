import { Box, Grid, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { CustomButton } from "../../../../../../components";
import { DatePicker, TimePicker } from "../../../../../../components/Form";

export function ScheduleForLater({ onSend }) {
  const [time, setTime] = useState();
  const [date, setDate] = useState(new Date());

  const disabled = useMemo(() => !time || !date, [time, date]);
  return (
    <Box>
      <Typography component="p" variant="p" fontSize={17} mb={4}>
        By choosing “Schedule Campaign” I confirm that I have collected explicit
        email marketing consent from each recipient on my list. I understand
        that violation of this policy may result in termination of my Propsify
        account.
      </Typography>
      <Grid container gap={1} mb={3}>
        <Grid item lg={5.85}>
          <DatePicker
            minDate={Date.now()}
            value={date}
            onChange={setDate}
            shrink
            label="Choose date and time"
          />
        </Grid>
        <Grid item lg={5.85}>
          <TimePicker value={time} onChange={setTime} required />
        </Grid>
      </Grid>
      <CustomButton
        disabled={disabled}
        onClick={() =>
          onSend(date.toISOString().split("T")[0] + "T" + time + ":00Z")
        }
        sx={{ width: "100%" }}
      >
        SCHEDULE CAMPAIGN
      </CustomButton>
    </Box>
  );
}
