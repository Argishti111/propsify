import { MoreHoriz } from "@mui/icons-material";
import { Checkbox, Typography } from "@mui/material";
import React from "react";
import "./Table.css";

export function Table() {
  return (
    <table cellSpacing={0}>
      <thead className="th-sm" align="left">
        <tr>
          <th style={{ width: 50 }}>
            <Checkbox />
          </th>
          <th style={{ width: 50 }}></th>
          <th>Name</th>
          <th>Email address</th>
          <th>Role</th>
          <th>Last activity</th>
          <th style={{ width: 40 }}></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr>
            <td style={{ width: 50 }}>
              <Checkbox />
            </td>
            <td style={{ width: 50 }}>
              <Typography
                variant="p"
                style={{
                  background: "#F9F4F0",
                  borderRadius: 50,
                  padding: "5px 0px",
                  display: "inline-block",
                  width: 32,
                  textAlign: "center",
                }}
              >
                {user.firstName[0]}
                {user.lastName[0]}
              </Typography>
            </td>

            <td>
              <Typography variant="p">
                {user.firstName} {user.lastName}
              </Typography>
            </td>
            <td>
              <Typography variant="p">{user.email}</Typography>
            </td>
            <td>
              <Typography variant="p">{user.role}</Typography>
            </td>
            <td>
              <Typography variant="p">{user.lastActivity}</Typography>
            </td>
            <td style={{ width: 40 }}>
              <MoreHoriz htmlColor="#beb082" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

const users = [
  {
    firstName: "Samantha",
    lastName: "Johns",
    email: "s.johns@luxuryestates.com",
    role: "Agent",
    lastActivity: "02/10/2022",
  },
  {
    firstName: "Marry",
    lastName: "Wane",
    email: "m.wane@luxuryestates.com",
    role: "Agent",
    lastActivity: "02/10/2022",
  },
];
