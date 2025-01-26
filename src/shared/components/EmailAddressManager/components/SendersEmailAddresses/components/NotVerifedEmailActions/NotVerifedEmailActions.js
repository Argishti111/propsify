import React from "react";
import { DropdownItem, MoreOptions } from "../../../../../../components";
import { ReactComponent as Trash } from "../../../../../../static/icons/icon-trash-can.svg";
import { ReactComponent as Sending } from "../../../../../../static/icons/icon-sending.svg";

export function NotVerifedEmailActions({ data, onSendEmail, onDelete }) {
  return (
    <MoreOptions>
      <DropdownItem
        Icon={Sending}
        text="Send verification email"
        onClick={(e) => {
          onSendEmail(data, e);
        }}
      />
      <DropdownItem
        Icon={Trash}
        text="Delete"
        onClick={(e) => {
          onDelete(data, e);
        }}
      />
    </MoreOptions>
  );
}
