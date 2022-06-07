// Determines wiggle speed of the wind arrow //

export default function getWiggle(windSpeed, units) {
  switch (units) {
    case "km/h":
      if (windSpeed >= 0 && windSpeed < 24.1402) {
        return "-slow";
      } else if (windSpeed >= 24.1402 && windSpeed < 51.499) {
        return "-medium";
      } else if (windSpeed >= 51.499) {
        return "-fast";
      }

    case "mph":
      if (windSpeed >= 0 && windSpeed < 15) {
        return "-slow";
      } else if (windSpeed >= 15 && windSpeed < 32) {
        return "-medium";
      } else if (windSpeed >= 32) {
        return "-fast";
      }

    case "kt":
      if (windSpeed >= 0 && windSpeed < 13.0346) {
        return "-slow";
      } else if (windSpeed >= 13.0346 && windSpeed < 27.8072) {
        return "-medium";
      } else if (windSpeed >= 27.8072) {
        return "-fast";
      }
  }
}
