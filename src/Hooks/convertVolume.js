export default function convertVolume(prevUnit, value, newUnit) {
  if (prevUnit === null || newUnit === null) {
    console.log("--> convert volume was provided null units, so aborted.");
    return value;
  }

  if (value === undefined || typeof value === "undefined" || value === null) {
    console.log("--> convert volume was provided undefined value, so aborted.");
    return 0;
  }

  let newValue;

  if (newUnit === "in" && prevUnit === "mm") {
    newValue = value / 25.4;
  } else if (newUnit === "mm" && prevUnit === "in") {
    newValue = value * 25.4;
  } else if (newUnit === prevUnit) {
    newValue = value;
  }

  // Round //
  newValue = Math.round((newValue + Number.EPSILON) * 100) / 100;
  console.log(
    `--> Converting volume units ${value}${prevUnit} to ${newValue}${newUnit}`
  );
  return newValue;
}
