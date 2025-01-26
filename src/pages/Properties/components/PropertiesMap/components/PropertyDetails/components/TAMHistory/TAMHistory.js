import { Grid, Typography } from "@mui/material";
import React from "react";
import { Table } from "../../../../../../../../shared/components";
import { TAMHistoryItem, Th } from "./components";
import "./TAMHistory.css";

export function TAMHistory({ data }) {
  return (
    <section id="tam">
      <Typography mb={2} variant="h6" fontStyle="italic">
        Transaction and mortgage history
      </Typography>
      <Grid
        style={{ overflowY: "auto" }}
        pb={2}
        px={4}
        ml={-4}
        mr={-1}
        mb={10}
        display="flex"
        flexWrap="wrap"
      >
        <Table>
          <thead>
            <tr className="list-item-shadow pd-th">
              <Th>Recording date</Th>
              <Th>Sale date</Th>
              <Th>Purchase method</Th>
              <Th>Document number</Th>
              <Th>Document type</Th>
              <Th>Transaction type</Th>
              <Th>Buyer name(s)</Th>
              <Th>Seller name(s)</Th>
              <Th>Amount</Th>
            </tr>
          </thead>
          <tbody style={{ marginLeft: -8, marginRight: -24, paddingRight: 32 }}>
            {data.property_history.map((history) => (
              <TAMHistoryItem key={history.recording_date} data={history} />
            ))}
          </tbody>
        </Table>
      </Grid>
    </section>
  );
}
