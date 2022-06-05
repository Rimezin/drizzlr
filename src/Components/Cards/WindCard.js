import { Card, Icon } from "@joshdschneider/formation";
import React from "react";

export default function WindCard(props) {
  const { location, weather, theme } = props;

  const [arrow, setArrow] = React.useState("arrow-n");

  React.useEffect(() => {
    switch (weather.wind.direction) {
      case "N":
        setArrow("arrow-n");
        break;
      case "NNE":
        setArrow("arrow-nne");
        break;
      case "NE":
        setArrow("arrow-ne");
        break;
      case "ENE":
        setArrow("arrow-ene");
        break;
      case "E":
        setArrow(null);
        break;
      case "ESE":
        setArrow("arrow-ese");
        break;
      case "SE":
        setArrow("arrow-se");
        break;
      case "SSE":
        setArrow("arrow-sse");
        break;
      case "S":
        setArrow("arrow-s");
        break;
      case "SSW":
        setArrow("arrow-ssw");
        break;
      case "SW":
        setArrow("arrow-sw");
        break;
      case "WSW":
        setArrow("arrow-wsw");
        break;
      case "W":
        setArrow("arrow-w");
        break;
      case "WNW":
        setArrow("arrow-wnw");
        break;
      case "NW":
        setArrow("arrow-nw");
        break;
      case "NNW":
        setArrow("arrow-nnw");
        break;
      default:
        break;
    }
  }, [weather.wind.direction]);

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className="card-header"
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        Wind in {location.name}
        <Icon icon="wind" style={{ marginLeft: "auto" }} />
      </div>
      <div className="wind-contents">
        <div className="wind-direction">
          <Icon icon="direction-right" className={`wind-arrow ${arrow}`} />
          {weather.wind.direction}
        </div>
        <div className="wind-speed">
          {weather.wind.speed}{" "}
          <span className="wind-speed-units">{weather.wind.units}</span>
        </div>
      </div>
    </Card>
  );
}
