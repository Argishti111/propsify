import { Typography } from "@mui/material";
import React from "react";
import { downloadFile } from "../../../../../../../services";
import links from "../../../../../../static/links";
import "./DownloadSample.css";

export function DownloadSample() {
  return (
    <Typography
      className="download-sample-text"
      fontSize={17}
      style={{ maxWidth: 506 }}
    >
      Download a sample{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.xlsxEmailTemplate, ".xlsx");
        }}
        href="#"
      >
        .xlsx
      </a>
      ,{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.csvEmailTemplate, ".csv");
        }}
        href="#"
      >
        .csv
      </a>{" "}
      or{" "}
      <a
        onClick={(e) => {
          e.preventDefault();
          downloadFile(links.tsvEmailTemplate, ".tsv");
        }}
        href="#"
      >
        .tsv
      </a>{" "}
      file.
    </Typography>
  );
}
