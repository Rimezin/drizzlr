import { Button, Card, Icon, Icons, Tooltip } from "@joshdschneider/formation";
import { icon } from "leaflet";
import React from "react";
import convertDay from "../../Hooks/convertDay";

export default function DailyCard(props) {
  const { location, weather, theme, handlePage } = props;

  const icons = {
    more: <Icon icon="double-chevron-right" intent="default" size="small" />,
  };

  const tooltip = {
    windDirection: <span>{weather.current.wind_deg}&deg;</span>,
  };

  /**
  {
    "dt": 1654624800,
    "sunrise": 1654600505,
    "sunset": 1654652633,
    "moonrise": 1654626480,
    "moonset": 1654585440,
    "moon_phase": 0.25,
    "temp": {
        "day": 84,
        "min": 70,
        "max": 85,
        "night": 76,
        "eve": 83,
        "morn": 70,
        "units": "F"
    },
    "feels_like": {
        "day": 89,
        "night": 77,
        "eve": 88,
        "morn": 72
    },
    "pressure": 1010,
    "humidity": 66,
    "dew_point": 295.04,
    "wind_speed": 15,
    "wind_deg": 96,
    "wind_gust": 27,
    "weather": [
        {
            "id": 501,
            "main": "Rain",
            "description": "moderate rain",
            "icon": "10d"
        }
    ],
    "clouds": 87,
    "pop": 1,
    "rain": 3.38,
    "uvi": 10.11,
    "wind_units": "mph",
    "wind_direction": "E"
}
*/

  // Render Day Elements //
  const dayElements = weather.daily.slice(1, 4).map((day) => (
    <Card
      key={`day${weather.daily.indexOf(day)}`}
      className={`day-card ${theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"}`}
    >
      <div className="day-day">{convertDay(day.dt, true)}</div>
      <img
        src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
        className="day-icon"
        alt="weather icon"
      />
      <div className="day-desc">{day.weather[0].main}</div>
      <div style={{ fontWeight: "300", textAlign: "center" }}>
        <span className="day-temp text-warning">{day.temp.max}</span>/
        <span className="day-temp text-primary">{day.temp.min}</span>
      </div>
      <div
        style={{
          fontSize: ".8rem",
          margin: ".25rem -0.5rem .25rem -0.5rem",
          textAlign: "center",
        }}
        className="text-blue"
      >
        <Icon
          icon="tint"
          size="small"
          style={{ height: ".75rem", width: ".75rem", fill: "#4cbcec" }}
          className="day-little-icon"
        />
        {Math.floor(day.pop * 100)}%
      </div>
      <div
        style={{
          fontSize: ".8rem",
          margin: ".25rem -0.5rem .25rem -0.5rem",
          textAlign: "center",
        }}
      >
        <Icon
          icon="wind"
          size="small"
          style={{ height: ".75rem", width: ".75rem" }}
          className="day-little-icon"
        />
        {day.wind_speed}
        <span className="day-wind-units">{day.wind_units}</span>
      </div>
    </Card>
  ));

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className={`card-header ${
          theme === "light" ? "bg-alt-light" : "bg-alt-dark"
        }`}
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        <span>3-Day Outlook</span>
        <Button
          name="Daily"
          id="Daily"
          variant="light"
          className="button-icon"
          onClick={handlePage}
          minimal
        >
          <Icon
            className="no-pointer"
            icon="double-chevron-right"
            intent="default"
            size="small"
          />
        </Button>
      </div>
      <div className="card-contents daily-contents">
        {/* <Tooltip selector="#wind-direction" content={tooltip.windDirection} /> */}
        {dayElements}
      </div>
    </Card>
  );
}
