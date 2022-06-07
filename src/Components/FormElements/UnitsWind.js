import React from "react";
import { Select } from "@joshdschneider/formation";

export default function UnitsWind(props) {
  const { windUnits, handleWindUnits } = props;

  const options = [
    { label: "mph", value: "mph" },
    { label: "km/h", value: "km/h" },
    { label: "kt", value: "kt" },
  ];

  return (
    <div style={{ marginLeft: "auto" }}>
      <Select options={options} value={windUnits} onChange={handleWindUnits} />
    </div>
  );
}
