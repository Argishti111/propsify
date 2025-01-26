import { PickersDay, pickersDayClasses } from "@mui/x-date-pickers";

export const renderPickerDay = (_, __, pickersDayProps) => {
  return (
    <PickersDay
      sx={{
        [`&&.${pickersDayClasses.selected}`]: {
          backgroundColor: "#ECD9CC",
          color: "white",
        },
      }}
      {...pickersDayProps}
    />
  );
};
