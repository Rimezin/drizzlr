import React from "react";
import { Select } from "@joshdschneider/formation";

export default function Units(props) {
  const { units, handleUnits } = props;

  const options = [
    { label: "Farenheit", value: "F" },
    { label: "Celcius", value: "C" },
    { label: "Kelvin", value: "K" },
  ];

  return <Select options={options} value={units} onChange={handleUnits} />;
}
