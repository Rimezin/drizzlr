import React from "react";
import { Card, Button, Tooltip, Icon } from "@joshdschneider/formation";
import convertTime from "../../Hooks/convertTime";

export default function MainCard(props) {
  const { location, weather, units, handleRefresh, theme } = props;

  const tooltip = {
    feel: <span>Feels Like</span>,
    high: <span>High Temp</span>,
    low: <span>Low Temp</span>,
  };

  const icons = {
    refresh: <Icon icon="refresh" intent="default" size="small" />,
    feel: <Icon icon="heart" intent="default" size="small" />,
    high: <Icon icon="double-chevron-up" intent="warning" size="small" />,
    low: <Icon icon="double-chevron-down" intent="primary" size="small" />,
  };

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className="card-header"
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        <span>Current Conditions</span>
        <Button
          variant="light"
          className="main-refresh"
          onClick={handleRefresh}
          leftIcon={icons.refresh}
          minimal
          intent="primary"
        >
          {convertTime(weather.dt)}
        </Button>
      </div>
      <div>
        <h4>
          {location.name}, {location.country}
        </h4>
        <p>
          <div className="main">
            <span className="main-temp">
              {weather.main.temp}&deg;{units}
            </span>
            <img
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              className="main-icon"
              alt="weather icon"
            />
          </div>
          <span className="main-condition">
            {weather.weather[0].description}
          </span>
          <div className="main-alt-temps">
            <Tooltip selector="#bd-fl" content={tooltip.feel} />
            <Tooltip selector="#bd-mx" content={tooltip.high} />
            <Tooltip selector="#bd-mn" content={tooltip.low} />

            <Button id="bd-fl" minimal leftIcon={icons.feel}>
              {weather.main.feels_like}&deg;{units}
            </Button>
            <Button id="bd-mx" minimal leftIcon={icons.high}>
              {weather.main.temp_max}&deg;{units}
            </Button>
            <Button id="bd-mn" minimal leftIcon={icons.low}>
              {weather.main.temp_min}&deg;{units}
            </Button>
          </div>
        </p>
      </div>
    </Card>
  );
}
