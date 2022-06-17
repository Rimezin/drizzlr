// Convert Temp based on units //

export default function convertTemp(prevUnit, prevTemp, units) {
  if (prevUnit === null || units === null) {
    console.log(
      "%c--> convert temp was provided null units, so aborted.",
      "color: gray;"
    );
    return prevTemp;
  }

  let newTemp;
  if (prevUnit === "K") {
    switch (units) {
      case "F":
        newTemp = (prevTemp - 273.15) * 1.8 + 32;
        break;
      case "C":
        newTemp = prevTemp - 273.15;
        break;
      default:
        newTemp = prevTemp;
        break;
    }
  } else if (prevUnit === "F") {
    switch (units) {
      case "K":
        newTemp = (prevTemp - 32) / 1.8 + 273.15;
        break;
      case "C":
        newTemp = (prevTemp - 32) / 1.8;
        break;
      default:
        newTemp = prevTemp;
        break;
    }
  } else if (prevUnit === "C") {
    switch (units) {
      case "F":
        newTemp = prevTemp * 1.8 + 32;
        break;
      case "K":
        newTemp = prevTemp + 273.152;
        break;
      default:
        newTemp = prevTemp;
        break;
    }
  } else {
    console.log(
      "%c--> Temperature Conversion FAILED! Units was not recognized...",
      "color: red;"
    );
    return prevTemp;
  }
  newTemp = Math.round(newTemp);
  console.log(
    `%c--> Temperature converting ${prevTemp}${prevUnit} to ${newTemp}${units}...`,
    "color: lime;"
  );
  return newTemp;
}
