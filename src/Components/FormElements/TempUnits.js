import React from "react";
import { Select } from "@joshdschneider/formation";

export default function TempUnits(props) {
  const { tempUnits, handleTempUnits } = props;

  const options = [
    { label: "Farenheit", value: "F" },
    { label: "Celcius", value: "C" },
    { label: "Kelvin", value: "K" },
  ];

  return (
    <div style={{ marginLeft: "auto" }}>
      <Select options={options} value={tempUnits} onChange={handleTempUnits} />
    </div>
  );
}
