import React from "react";
import { Card, Button, Tooltip, Icon } from "@joshdschneider/formation";
import convertTime from "../../Hooks/convertTime";
import convertDateTime from "../../Hooks/convertDateTime";

export default function MainCard(props) {
  const { location, weather, handleRefresh, theme, openModal } = props;

  const [time, setTime] = React.useState("");

  React.useEffect(() => {
    setTime(convertTime(weather.current.dt, weather.time_units));
  }, [weather]);

  const tooltip = {
    feel: <span>Feels Like</span>,
    high: <span>High Temp</span>,
    low: <span>Low Temp</span>,
    alerts: function () {
      if (weather.alerts !== null && weather.alerts !== undefined) {
        return (
          <span>
            {weather.alerts.length} alert{weather.alerts.length > 1 ? "s" : ""}
          </span>
        );
      }
    },
  };

  const icons = {
    refresh: <Icon icon="refresh" intent="default" size="small" />,
    feel: <Icon icon="heart" intent="default" size="small" />,
    high: <Icon icon="double-chevron-up" intent="warning" size="small" />,
    low: <Icon icon="double-chevron-down" intent="primary" size="small" />,
  };

  function alerts() {
    if (weather.alerts !== undefined && weather.alerts !== null) {
      const alertsArray = weather.alerts.map((alert) => (
        <div>
          <h5>{alert.event}</h5>
          <br />
          <small>from {alert.sender_name}</small>
          <br />
          <small>
            {convertDateTime(alert.start, weather.time_units)} -{" "}
            {convertDateTime(alert.end, weather.time_units)}
          </small>
          <br />
          <br />
          <span>{alert.description}</span>
          <br />
          <hr />
        </div>
      ));

      return (
        <div
          className="alerts-div"
          onClick={() => {
            openModal(
              alertsArray,
              `${weather.alerts.length} alert${
                weather.alerts.length > 1 ? "s" : ""
              } for ${location.name}`,
              "warning-sign"
            );
          }}
        >
          <Tooltip selector="#alerts-icon" content={tooltip.alerts()} />
          <Icon
            icon="warning-sign"
            intent="danger"
            className="alerts-icon"
            id="alerts-icon"
          ></Icon>
        </div>
      );
    }
  }

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className={`card-header ${
          theme === "light" ? "bg-alt-light" : "bg-alt-dark"
        }`}
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        <span>Current Conditions</span>
        <Button
          variant="light"
          className="main-refresh"
          onClick={handleRefresh}
          minimal
          // intent="primary"
        >
          <Icon icon="refresh" intent="default" size="small" />
        </Button>
      </div>
      <div className="card-contents">
        <div className="main-title">
          <h4>
            {location.name}, {location.country}
          </h4>
          {alerts()}
        </div>
        <small className="text-blue">As of {time}</small>
        <p>
          <div className="main">
            <span className="main-temp">
              {weather.current.temp}&deg;{weather.current.temp_units}
            </span>
            <img
              src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`}
              className="main-icon"
              alt="weather icon"
            />
          </div>
          <span className="main-condition">
            {weather.current.weather[0].description}
          </span>
          <div className="main-alt-temps">
            <Tooltip selector="#bd-fl" content={tooltip.feel} />
            <Tooltip selector="#bd-mx" content={tooltip.high} />
            <Tooltip selector="#bd-mn" content={tooltip.low} />

            <Button id="bd-fl" minimal leftIcon={icons.feel}>
              {weather.current.feels_like}&deg;{weather.current.temp_units}
            </Button>
            <Button id="bd-mx" minimal leftIcon={icons.high}>
              {weather.daily[0].temp.max}&deg;{weather.daily[0].temp.units}
            </Button>
            <Button id="bd-mn" minimal leftIcon={icons.low}>
              {weather.daily[0].temp.min}&deg;{weather.daily[0].temp.units}
            </Button>
          </div>
        </p>
      </div>
    </Card>
  );
}
