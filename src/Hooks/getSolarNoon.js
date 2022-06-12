export default function getSolarNoon(sunrise, sunset) {
  console.log("GET SOLAR NOON | Getting date objects:");
  // Get date objects for sunrise and sunset //
  const sunUp = new Date(sunrise * 1000).getTime();
  const sunDown = new Date(sunset * 1000).getTime();
  console.log(`> sunUp: ${sunUp}, sunDown: ${sunDown}`);

  // get date object as average of sunset and sunrise //
  let solarnoon = new Date((sunUp + sunDown) / 2);
  console.log(`> solar noon as Date: ${solarnoon}`);

  // convert to unix time //
  solarnoon = Math.floor(solarnoon / 1000);
  console.log(`> Converted to unix time: ${solarnoon}`);

  // return //
  return solarnoon;
}
