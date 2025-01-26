import { Typography } from "@mui/material";
import React from "react";
import { downloadFile } from "../../../../../../../services";
import links from "../../../../../../static/links";

export function FileTemplates() {
  return (
    <Typography
      textAlign="center"
      alignSelf="center"
      fontSize={17}
      style={{ maxWidth: 506, marginTop: 20 }}
    >
      Download a sample{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.xlsxTemplate, ".xlsx");
        }}
        href="#"
      >
        .xlsx
      </a>
      ,{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.csvTemplate, ".csv");
        }}
        href="#"
      >
        .csv
      </a>{" "}
      or{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.tsvTemplate, ".tsv");
        }}
        href="#"
      >
        .tsv
      </a>{" "}
      file.
    </Typography>
  );
}
