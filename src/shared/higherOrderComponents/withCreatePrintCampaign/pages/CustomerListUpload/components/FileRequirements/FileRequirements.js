import { Typography } from "@mui/material";
import React from "react";
import "./FileRequirements.css";

export function FileRequirements({ style }) {
  return (
    <div
      className="file-requirements-container"
      style={{
        marginBottom: 80,
        ...style,
      }}
    >
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
      <ul className="file-requirements">
        <li>
          Do not include commas within your data fields. For example: "John, Q"
          for the First Name. This will cause issues with .csv files.
        </li>
        <li>.xlsx, .csv, or .tsv files are accepted</li>
        <li>.csv files must be comma delimited</li>
        <li>Worksheet name in .xlsx should not contain special characters</li>
        <li>
          Place apartment, suite, and lot numbers in a Address 2 column. USPS
          will not recognize that as a valid street address.
        </li>
        <li>File size cannot exceed 4MB</li>
      </ul>
    </div>
  );
}
