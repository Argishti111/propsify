import React from "react";
import "./Table.css";

export function Table({ className = "", children, ...rest }) {
  return (
    <table
      cellSpacing="0"
      cellPadding="0"
      {...rest}
      className={`table ${className}`}
    >
      {children}
    </table>
  );
}
