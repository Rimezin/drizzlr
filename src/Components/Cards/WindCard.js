import { Card, Icon, Tooltip } from "@joshdschneider/formation";
import React from "react";
import getArrow from "../../Hooks/getArrow";
import getWiggle from "../../Hooks/getWiggle";

export default function WindCard(props) {
  const { location, weather, theme } = props;

  const [arrow, setArrow] = React.useState("arrow-n");
  const [wiggle, setWiggle] = React.useState("-slow");

  // Set current winds
  React.useEffect(() => {
    setArrow(getArrow(weather.current.wind_direction));
    setWiggle(
      getWiggle(weather.current.wind_speed, weather.current.wind_units)
    );
  }, [weather.current.wind_direction, weather.current.wind_speed]);

  const tooltip = {
    windDirection: <span>{weather.current.wind_deg}&deg;</span>,
  };

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className={`card-header ${
          theme === "light" ? "card-header-light" : "card-header-dark"
        }`}
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        Wind in {location.name}
        <Icon icon="wind" style={{ marginLeft: "auto" }} />
      </div>
      <div className="card-contents wind-contents">
        <Tooltip selector="#wind-direction" content={tooltip.windDirection} />
        <div id="wind-direction" className="wind-direction">
          <div className={`wiggle${wiggle}`}>
            <Icon icon="direction-right" className={`wind-arrow ${arrow}`} />
          </div>
          {weather.current.wind_direction}
        </div>
        <div className="wind-speed">
          {weather.current.wind_speed}{" "}
          <span className="wind-speed-units">{weather.current.wind_units}</span>
        </div>
      </div>
      <div className="wind-contents">
        Forecasted Gusts: {weather.hourly[0].wind_gust}
        &nbsp;
        <span className="wind-speed-units small">
          {weather.hourly[0].wind_units}
        </span>
      </div>
    </Card>
  );
}
