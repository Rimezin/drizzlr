import React from "react";
import { Select } from "@joshdschneider/formation";

export default function UnitsVolume(props) {
  const { volumeUnits, handleVolumeUnits } = props;

  const options = [
    { label: "Millimeters", value: "mm" },
    { label: "Inches", value: "in" },
  ];

  return (
    <div style={{ marginLeft: "auto" }}>
      <Select
        options={options}
        value={volumeUnits}
        onChange={handleVolumeUnits}
      />
    </div>
  );
}
