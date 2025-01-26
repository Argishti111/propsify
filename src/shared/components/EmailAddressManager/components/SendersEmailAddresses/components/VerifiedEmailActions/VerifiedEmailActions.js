import React from "react";
import { DeleteIcon } from "../../../../../../static/icons";

export function VerifiedEmailActions({ data, onDelete }) {
  return <DeleteIcon onClick={(e) => onDelete(data, e)} />;
}
