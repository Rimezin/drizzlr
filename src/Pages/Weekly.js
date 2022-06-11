import React from "react";
import convertDay from "../Hooks/convertDay";
import { Button, Card, Icon } from "@joshdschneider/formation";
import convertDate from "../Hooks/convertDate";
import getWiggle from "../Hooks/getWiggle";

export default function Daily(props) {
  const { location, weather, theme, handlePage, handleDay } = props;

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
  const dayElements = weather.daily.map((thisDay, index) => (
    <div
      style={{ cursor: "pointer", display: "flex", justifyContent: "center" }}
      onClick={() => {
        handleDay(index);
      }}
    >
      <Card
        key={`Day_${index}`}
        style={{ width: "18rem", maxWidth: "76%", margin: "10px" }}
        className={` ${theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"}`}
        interactive
      >
        <div className="day-page-day">
          {convertDay(thisDay.dt, false)}{" "}
          <span className="day-page-date">
            ({convertDate(thisDay.dt, true)})
          </span>
          <img
            src={`http://openweathermap.org/img/wn/${thisDay.weather[0].icon}@2x.png`}
            className="day-page-icon"
            alt="weather icon"
          />
        </div>

        <div className="day-page-desc">{thisDay.weather[0].description}</div>

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
            {thisDay.temp.max}&deg;{thisDay.temp.units}
          </span>
          &nbsp;&nbsp;&nbsp;Low:{" "}
          <span className="day-page-temp text-primary">
            {thisDay.temp.min}&deg;{thisDay.temp.units}
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
            Precip: {Math.floor(thisDay.pop * 100)}%
          </div>
          <div className="text-blue">
            <Icon
              icon="cloud-upload"
              size="large"
              style={{
                height: "1.1rem",
                width: "1.1rem",
                fill: "#4cbcec",
                marginRight: ".25rem",
              }}
            />
            Humid: {Math.floor(thisDay.humidity)}%
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
            Wind: {thisDay.wind_speed}
            <span className="day-page-wind-units">{thisDay.wind_units}</span>
          </div>
          <div className="wind-day-direction">
            <div
              className={`wiggle${getWiggle(
                thisDay.wind_speed,
                thisDay.wind_units
              )}`}
            >
              <Icon
                icon="direction-right"
                className={`day-wind-arrow arrow-${thisDay.wind_direction.toLowerCase()}`}
              />
            </div>
            {thisDay.wind_direction}{" "}
            <span className="day-page-wind-units">{thisDay.wind_deg}&deg;</span>
          </div>
          <div>
            <Icon
              icon="mountain"
              size="large"
              style={{
                height: "1rem",
                width: "1rem",
                marginRight: ".25rem",
              }}
            />
            Gusts: {thisDay.wind_gust}
            <span className="day-page-wind-units">{thisDay.wind_units}</span>
          </div>
        </div>
      </Card>
    </div>
  ));

  return (
    <>
      <div
        className={`page-nav ${
          theme === "dark" ? "bg-alt-dark-nav" : "bg-alt-mid-nav"
        }`}
      >
        <div className="back-button">
          <Button
            leftIcon={<Icon icon="double-chevron-left" />}
            minimal
            intent="primary"
            name="Home"
            onClick={handlePage}
            size="small"
          >
            Home
          </Button>
        </div>
        <div className="page-title-container">
          <span className="page-title">Weekly Outlook</span>
          <span className="page-sub-title">in {location.name}</span>
        </div>
      </div>
      <div className="page-container">
        <div className="page-daily">{dayElements}</div>
      </div>
    </>
  );
}
