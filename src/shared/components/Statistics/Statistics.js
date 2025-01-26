import React, { useState } from "react";
import "./Statistics.css";

export function Statistics({
  toggleStatistics = () => {},
  visible = true,
  children,
}) {
  const [height] = useState(120);
  const [transition] = useState(500);

  return (
    <div
      style={{ height, transition: `${transition}ms` }}
      // ref={refCallback}
      onClick={toggleStatistics}
      className={`statistics ${
        visible || height === "auto" ? "" : "statistics-hidden"
      }`}
    >
      <div>{children}</div>
    </div>
  );
}
