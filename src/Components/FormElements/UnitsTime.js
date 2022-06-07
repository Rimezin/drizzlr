import React from "react";
import { Select } from "@joshdschneider/formation";

export default function UnitsTime(props) {
  const { timeUnits, handleTimeUnits } = props;

  const options = [
    { label: "12-hour", value: "12hr" },
    { label: "24-hour", value: "24hr" },
  ];

  return (
    <div style={{ marginLeft: "auto" }}>
      <Select options={options} value={timeUnits} onChange={handleTimeUnits} />
    </div>
  );
}
