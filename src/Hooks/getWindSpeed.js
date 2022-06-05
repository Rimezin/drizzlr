export default function (oldUnit, speed, newUnit) {
  let returnValue;
  console.log(`GETWINDSPEED | Converting ${speed}${oldUnit} to ${newUnit}...`);

  switch (oldUnit) {
    case "m/s":
      if (newUnit === "km/h") {
        // Convert to km/h //
        returnValue = speed * 3.6;
      } else if (newUnit === "mph") {
        // Convert to mph //
        returnValue = speed * 2.23694;
      } else if (newUnit === "kt") {
        // Convert to knots //
        returnValue = speed * 1.94384;
      }
      break;
    case "km/h":
      if (newUnit === "mph") {
        // Convert to mph //
        returnValue = speed / 1.609;
      } else if (newUnit === "kt") {
        // Convert to knots //
        returnValue = speed / 1.852;
      }
      break;
    case "mph":
      if (newUnit === "km/h") {
        // Convert to mph //
        returnValue = speed * 1.60934;
      } else if (newUnit === "kt") {
        // Convert to knots //
        returnValue = speed / 1.151;
      }
      break;
    case "kt":
      if (newUnit === "km/h") {
        // Convert to km/h //
        returnValue = speed * 1.852;
      } else if (newUnit === "mph") {
        // Convert to mph //
        returnValue = speed * 1.15078;
      }
      break;
    default:
      break;
  }

  if (returnValue !== undefined) {
    returnValue = Math.round(returnValue);
  }
  console.log(`>> Result: ${returnValue}`);
  return returnValue;
}
