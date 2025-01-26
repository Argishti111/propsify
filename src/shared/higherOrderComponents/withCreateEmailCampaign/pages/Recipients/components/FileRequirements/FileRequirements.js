import { Typography } from "@mui/material";
import React from "react";
import "./FileRequirements.css";

export function FileRequirements({ style = { marginTop: 57 } }) {
  return (
    <div style={style} className="file-requirements-container">
      <Typography
        fontSize={15}
        variant="p"
        fontWeight="500"
        fontStyle="italic"
        color="#beb082"
        letterSpacing={0.9}
      >
        File requirements
      </Typography>
      <ul className="file-requirements email-file-requirements">
        <li>
          Do not include commas within your data fields, for example, "John, S"
          in the First Name column, as this will cause .csv files to be loaded
          incorrectly
        </li>
        <li>.xlsx, .csv, or .tsv files are accepted</li>
        <li>.csv files must be comma delimited</li>
        <li>Do not include special characters in .xlsx worksheet name</li>
        <li>File size cannot exceed 2MB</li>
        <li>File may contain a maximum of 10,000 rows</li>
      </ul>
    </div>
  );
}
