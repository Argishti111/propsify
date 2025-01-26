import React from "react";
import "./THead.css";

export function THead({ className = "", children, ...rest }) {
  return (
    <thead {...rest} className={`thead ${className}`}>
      {children}
    </thead>
  );
}
