import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import { DropdownItem, MoreOptions } from "../../../../../../shared/components";

export function Draft({ item, onEdit, onDelete }) {
  return (
    <>
      <tr key={item.id}>
        <td style={{ paddingLeft: 30 }}>{item.name}</td>
        <td style={{ marginLeft: 2 }}>{item.recipients}</td>
        <td style={{ width: 50 }}>
          <MoreOptions style={{ paddingRight: 12, paddingLeft: 12 }}>
            <DropdownItem
              iconColor="#BEB082"
              Icon={Edit}
              text="Edit"
              onClick={onEdit(item)}
            />
            <DropdownItem
              iconColor="#BEB082"
              Icon={Delete}
              text="Delete"
              onClick={() => onDelete(item)}
            />
          </MoreOptions>
        </td>
      </tr>
    </>
  );
}
