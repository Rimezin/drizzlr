import React from "react";
import convertDay from "../Hooks/convertDay";
import { Button, Card, Icon } from "@joshdschneider/formation";
import convertDate from "../Hooks/convertDate";
import getArrow from "../Hooks/getArrow";
import getWiggle from "../Hooks/getWiggle";
import convertTime from "../Hooks/convertTime";

export default function Day(props) {
  const { location, weather, theme, handlePage, day } = props;

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

  React.useEffect(() => {
    console.log(`DAY RENDER: ${day}`);
  }, [day]);

  const [arrow, setArrow] = React.useState("arrow-n");
  const [wiggle, setWiggle] = React.useState("-slow");

  // Set current winds
  React.useEffect(() => {
    setArrow(getArrow(weather.daily[day].wind_direction));
    setWiggle(
      getWiggle(weather.daily[day].wind_speed, weather.daily[day].wind_units)
    );
  }, [weather.daily[day].wind_direction, weather.daily[day].wind_speed]);

  // Time Chart //

  return (
    <>
      <div className="back-button">
        <Button
          leftIcon={<Icon icon="double-chevron-left" />}
          minimal
          intent="primary"
          name="Daily"
          onClick={handlePage}
          size="small"
        >
          Back to Daily
        </Button>
      </div>
      <div className="day-details-page">
        <Card
          className={`day-details-card ${
            theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"
          }`}
        >
          <div className="day-page-day">
            {convertDay(weather.daily[day].dt, false)}{" "}
            <span className="day-page-date">
              ({convertDate(weather.daily[day].dt, true)})
            </span>
            <img
              src={`http://openweathermap.org/img/wn/${weather.daily[day].weather[0].icon}@2x.png`}
              className="day-page-icon"
              alt="weather icon"
            />
          </div>

          <div className="day-page-desc">
            {weather.daily[day].weather[0].description}
          </div>

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
              {weather.daily[day].temp.max}&deg;{weather.daily[day].temp.units}
            </span>
            &nbsp;&nbsp;&nbsp;Low:{" "}
            <span className="day-page-temp text-primary">
              {weather.daily[day].temp.min}&deg;{weather.daily[day].temp.units}
            </span>
          </div>
          <div
            className="day-page-tertiary"
            style={{
              border:
                theme === "dark" ? "1px solid #383e47" : "1px solid #d3d8de",
            }}
          >
            <div>
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
              <span className="text-blue">Precipitation Chance:</span>{" "}
              {Math.floor(weather.daily[day].pop * 100)}%
            </div>
            <div>
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
              <span className="text-blue">Expected Rain:</span>{" "}
              {weather.daily[day].rain}
              {weather.daily[day].volume_units}
            </div>
            <div>
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
              <span className="text-blue">Expected Snow:</span>{" "}
              {weather.daily[day].snow}
              {weather.daily[day].volume_units}
            </div>
          </div>
          <div
            className="day-page-tertiary"
            style={{
              border:
                theme === "dark" ? "1px solid #383e47" : "1px solid #d3d8de",
            }}
          >
            <div>
              <Icon
                icon="cloud-upload"
                size="large"
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  marginRight: ".25rem",
                }}
              />
              <span>Humidity:</span> {Math.floor(weather.daily[day].humidity)}%
            </div>
            <div>
              <Icon
                icon="cloud"
                size="large"
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  marginRight: ".25rem",
                }}
              />
              <span>Cloud Cover:</span> {Math.floor(weather.daily[day].clouds)}%
            </div>
            <div>
              <Icon
                icon="cloud-download"
                size="large"
                style={{
                  height: "1.1rem",
                  width: "1.1rem",
                  marginRight: ".25rem",
                }}
              />
              <span>Dew Point:</span> {Math.floor(weather.daily[day].dew_point)}
              &deg;
              {weather.daily[day].temp.units}
            </div>
          </div>
          <div
            className="day-page-tertiary"
            style={{
              border:
                theme === "dark" ? "1px solid #383e47" : "1px solid #d3d8de",
            }}
          >
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
              Wind Speed: {weather.daily[day].wind_speed}
              <span className="day-page-wind-units">
                {weather.daily[day].wind_units}
              </span>
            </div>
            <div className="wind-day-direction">
              <div className={`wiggle${wiggle}`}>
                <Icon
                  icon="direction-right"
                  className={`day-wind-arrow ${arrow}`}
                />
              </div>
              Direction: {weather.daily[day].wind_direction}{" "}
              <span className="day-page-wind-units">
                {weather.daily[day].wind_deg}&deg;
              </span>
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
              Gust Speed: {weather.daily[day].wind_gust}
              <span className="day-page-wind-units">
                {weather.daily[day].wind_units}
              </span>
            </div>
          </div>
        </Card>
        <Card
          className={`day-details-card ${
            theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"
          }`}
        >
          <h4>Astronomical:</h4>
          <div>
            <div>
              Sunrise:{" "}
              {convertTime(weather.daily[day].sunrise, weather.time_units)}
            </div>
            <div>
              Sunset:{" "}
              {convertTime(weather.daily[day].sunset, weather.time_units)}
            </div>
            <div>
              Moonrise:{" "}
              {convertTime(weather.daily[day].moonrise, weather.time_units)}
            </div>
            <div>
              Moonset:{" "}
              {convertTime(weather.daily[day].moonset, weather.time_units)}
            </div>
            <div>Barometric Pressure: {weather.daily[day].pressure} (hPa)</div>
          </div>
        </Card>
      </div>
    </>
  );
}
