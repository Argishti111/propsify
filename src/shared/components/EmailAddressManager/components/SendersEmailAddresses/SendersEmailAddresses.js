import React from "react";
import { SectionTitle } from "../../../../components";
import { SendersEmailAddress } from "./components";
import "./SendersEmailAddresses.css";

export function SendersEmailAddresses({ emails = [], onDelete, onSendEmail }) {
  return (
    <>
      <SectionTitle>SENDER'S EMAIL ADDRESS</SectionTitle>
      <ul className="senders-email-addresses">
        {emails.map((email) => (
          <SendersEmailAddress
            key={email.id}
            data={email}
            onDelete={onDelete}
            onSendEmail={onSendEmail}
          />
        ))}
      </ul>
    </>
  );
}
