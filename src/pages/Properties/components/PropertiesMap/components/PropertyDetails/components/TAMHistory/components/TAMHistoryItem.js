import React from "react";
import { Td } from "./Td";

export function TAMHistoryItem({ data }) {
  return (
    <tr className="list-item-shadow pd-td">
      <Td>
        {data.recording_date
          ? new Date(data.recording_date).toLocaleDateString()
          : "-"}
      </Td>
      <Td>
        {data.last_sale_date
          ? new Date(data.last_sale_date).toLocaleDateString()
          : "-"}
      </Td>
      <Td>{data.purchase_method ?? "-"}</Td>
      <Td style={{ paddingLeft: 8 }}>{data.document_number ?? "-"}</Td>
      <Td style={{ paddingLeft: 8 }}>{data.document_type ?? "-"}</Td>
      <Td style={{ paddingLeft: 8 }}>{data.transaction_type ?? "-"}</Td>
      <Td style={{ paddingLeft: 16 }}>{data.buyer_names ?? "-"}</Td>
      <Td style={{ paddingLeft: 16 }}>{data.seller_names ?? "-"}</Td>
      <Td style={{ paddingLeft: 16 }}>{data.amount}</Td>
    </tr>
  );
}
