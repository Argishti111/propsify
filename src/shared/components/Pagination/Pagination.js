import { Pagination as MUIPagination, PaginationItem } from "@mui/material";
import React from "react";

export function Pagination({ page, onChange, count, ...rest }) {
  if (count < 2) {
    return null;
  }
  return (
    <MUIPagination
      page={page}
      onChange={onChange}
      renderItem={(props) => {
        return (
          <PaginationItem
            sx={{
              cursor: props.selected ? "default" : "pointer",
              color: props.selected ? "#000 !important" : "#666666",
              background: props.selected ? "#ECD9CC4D" : "#fff",
              borderColor: props.disabled ? "#ECD9CC80" : "#D2BCAC",
            }}
            {...props}
          />
        );
      }}
      sx={{
        "& ul": {
          justifyContent: "flex-end",
          mt: 4,
        },
      }}
      count={count}
      color="primary"
      variant="outlined"
      {...rest}
    />
  );
}
