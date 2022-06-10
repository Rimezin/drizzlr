export default function getWindDirection(deg) {
  let cardinal = "?";
  if (348.75 <= deg && deg < 360) {
    cardinal = "N";
  } else if (0 <= deg && deg < 11.25) {
    cardinal = "N";
  } else if (11.25 <= deg && deg < 33.75) {
    cardinal = "NNE";
  } else if (33.75 <= deg && deg < 56.25) {
    cardinal = "NE";
  } else if (56.25 <= deg && deg < 78.75) {
    cardinal = "ENE";
  } else if (78.75 <= deg && deg < 101.25) {
    cardinal = "E";
  } else if (101.25 <= deg && deg < 123.75) {
    cardinal = "ESE";
  } else if (123.75 <= deg && deg < 146.25) {
    cardinal = "SE";
  } else if (146.25 <= deg && deg < 168.75) {
    cardinal = "SSE";
  } else if (168.75 <= deg && deg < 191.25) {
    cardinal = "S";
  } else if (191.25 <= deg && deg < 213.75) {
    cardinal = "SSW";
  } else if (213.75 <= deg && deg < 236.25) {
    cardinal = "SW";
  } else if (236.25 <= deg && deg < 258.75) {
    cardinal = "WSW";
  } else if (258.75 <= deg && deg < 281.25) {
    cardinal = "W";
  } else if (281.25 <= deg && deg < 303.75) {
    cardinal = "WNW";
  } else if (303.75 <= deg && deg < 326.25) {
    cardinal = "NW";
  } else if (326.25 <= deg && deg < 348.75) {
    cardinal = "NNW";
  } else {
    console.log(
      `--> Wind Direction Error: ${deg}deg is not between 0 and 360.`
    );
  }
  console.log(`--> Wind direction converting ${deg}(deg) to ${cardinal}`);
  return cardinal;
}
