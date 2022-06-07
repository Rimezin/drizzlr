export default function getArrow(direction) {
  switch (direction) {
    case "N":
      return "arrow-n";

    case "NNE":
      return "arrow-nne";

    case "NE":
      return "arrow-ne";

    case "ENE":
      return "arrow-ene";

    case "E":
      return "arrow-e";

    case "ESE":
      return "arrow-ese";

    case "SE":
      return "arrow-se";

    case "SSE":
      return "arrow-sse";

    case "S":
      return "arrow-s";

    case "SSW":
      return "arrow-ssw";

    case "SW":
      return "arrow-sw";

    case "WSW":
      return "arrow-wsw";

    case "W":
      return "arrow-w";

    case "WNW":
      return "arrow-wnw";

    case "NW":
      return "arrow-nw";

    case "NNW":
      return "arrow-nnw";

    default:
      break;
  }
}
