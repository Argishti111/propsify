import React from "react";
import "./CustomerTable.css";

export function CustomerTable({ data }) {
  return (
    <table cellSpacing="0" cellPadding="0" className="propsify-table">
      <thead style={{ position: "sticky", position: "-webkit-sticky", top: 0 }}>
        <tr>
          <th>Full name</th>
          <th>Address 1</th>
          <th>Address 2</th>
          <th>City</th>
          <th>State</th>
          <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {data?.map((customer) => (
          <tr key={customer.id}>
            <td>
              {customer.firstName} {customer.lastName}
            </td>
            <td>{customer.addressLine1}</td>
            <td>{customer.addressLine2}</td>
            <td>{customer.addressCity}</td>
            <td>{customer.addressState}</td>
            <td>{customer.addressZip}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
