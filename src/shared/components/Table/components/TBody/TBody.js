import React from "react";
import "./TBody.css";

export function TBody({ ref, className = "", children, ...rest }) {
  return (
    <tbody {...rest} ref={ref} className={`tbody ${className}`}>
      {children}
    </tbody>
  );
}
