import React from "react";
import { Sidebar } from "../components";

export function MainLayout({ children }) {
  return (
    <div className="main-container">
      <Sidebar />
      {children}
    </div>
  );
}
