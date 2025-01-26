import { Grid } from "@mui/material";
import React from "react";
import { ActionBar, Table } from "./components";

export function Users() {
  return (
    <Grid p={3}>
      <ActionBar />
      <Table />
    </Grid>
  );
}
