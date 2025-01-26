import React from "react";
import "./ListItem.css";

export function ListItem({ style, children, white }) {
  return (
    <li style={style} className={`list-item ${white ? "list-item-white" : ""}`}>
      {children}
    </li>
  );
}
