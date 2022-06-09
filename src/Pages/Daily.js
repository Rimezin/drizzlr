import React from "react";
import convertDay from "../Hooks/convertDay";
import { Button, Card, Icon } from "@joshdschneider/formation";
import convertDate from "../Hooks/convertDate";

export default function Daily(props) {
  const { location, weather, theme, handlePage } = props;

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
  const dayElements = weather.daily.map((day) => (
    <Card
      key={weather.daily.indexOf(day)}
      style={{ width: "18rem", maxWidth: "76%" }}
      className={` ${theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"}`}
      interactive
    >
      <div className="day-page-day">
        {convertDay(day.dt, false)}{" "}
        <span className="day-page-date">({convertDate(day.dt, true)})</span>
        <img
          src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
          className="day-page-icon"
          alt="weather icon"
        />
      </div>

      <div className="day-page-desc">{day.weather[0].description}</div>

      <div
        className="day-page-temp-container"
        style={{
          fontWeight: "300",
          textAlign: "center",
          backgroundColor: theme === "dark" ? "#242930" : "#eef2f7",
        }}
      >
        High:{" "}
        <span className="day-page-temp text-warning">
          {day.temp.max}&deg;{day.temp.units}
        </span>
        &nbsp;&nbsp;&nbsp;Low:{" "}
        <span className="day-page-temp text-primary">
          {day.temp.min}&deg;{day.temp.units}
        </span>
      </div>
      <div className="day-page-tertiary">
        <div className="text-blue">
          <Icon
            icon="tint"
            size="large"
            style={{
              height: "1.25rem",
              width: "1.25rem",
              fill: "#4cbcec",
              marginRight: ".25rem",
            }}
          />
          Precip: {Math.floor(day.pop * 100)}%
        </div>
        <div className="text-blue">
          <Icon
            icon="cloud-download"
            size="large"
            style={{
              height: "1.1rem",
              width: "1.1rem",
              fill: "#4cbcec",
              marginRight: ".25rem",
            }}
          />
          DP: {Math.floor(day.dew_point)}&deg;{day.temp.units}
        </div>
      </div>
      <div className="day-page-tertiary">
        <div>
          <Icon
            icon="wind"
            size="large"
            style={{
              height: "1rem",
              width: "1rem",
              marginRight: ".25rem",
            }}
          />
          Wind: {day.wind_speed}
          <span className="day-page-wind-units">{day.wind_units}</span>
        </div>
        <div>
          {day.wind_direction}{" "}
          <span className="day-page-wind-units">{day.wind_deg}&deg;</span>
        </div>
        <div>
          <Icon
            icon="wind"
            size="large"
            style={{
              height: "1rem",
              width: "1rem",
              marginRight: ".25rem",
            }}
          />
          Gusts: {day.wind_gust}
          <span className="day-page-wind-units">{day.wind_units}</span>
        </div>
      </div>
    </Card>
  ));

  return (
    <>
      <div className="back-button">
        <Button
          leftIcon={<Icon icon="double-chevron-left" />}
          minimal
          intent="primary"
          name="Home"
          onClick={handlePage}
          size="small"
        >
          Back to Home
        </Button>
      </div>

      <h1 className="page-title">Daily Forecast in {location.name}</h1>
      <div className="page-daily">{dayElements}</div>
    </>
  );
}
