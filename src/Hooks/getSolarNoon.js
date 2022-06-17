export default function getSolarNoon(sunrise, sunset) {
  console.log("%cGET SOLAR NOON | Getting date objects:", "color: green;");
  // Get date objects for sunrise and sunset //
  const sunUp = new Date(sunrise * 1000).getTime();
  const sunDown = new Date(sunset * 1000).getTime();
  console.log(`%c> sunUp: ${sunUp}, sunDown: ${sunDown}`, "color: lightgreen;");

  // get date object as average of sunset and sunrise //
  let solarnoon = new Date((sunUp + sunDown) / 2);
  console.log(`%c> solar noon as Date: ${solarnoon}`, "color: lightgreen");

  // convert to unix time //
  solarnoon = Math.floor(solarnoon / 1000);
  console.log(`%c> Converted to unix time: ${solarnoon}`, "color: lightgreen");

  // return //
  return solarnoon;
}
