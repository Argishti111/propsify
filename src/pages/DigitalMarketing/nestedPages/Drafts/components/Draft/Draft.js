import React from "react";
import {
  getFormatedDate,
  toLocalDatetime,
} from "../../../../../../shared/helpers";
import { DeleteIcon, EditIcon } from "../../../../../../shared/static/icons";

export function Draft({ item, onEdit, onDelete }) {
  return (
    <>
      <tr style={{ paddingLeft: 16 }}>
        <td>Google Ads</td>
        <td>{item.name}</td>
        <td style={{ marginLeft: 2 }}>{item.type}</td>
        <td>{getFormatedDate(toLocalDatetime(item.created))}</td>
        <td style={{ width: 50 }}>
          <EditIcon onClick={() => onEdit(item)} />
          <DeleteIcon onClick={() => onDelete(item)} />
        </td>
      </tr>
    </>
  );
}
