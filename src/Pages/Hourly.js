import React from "react";
import { Button, Card, Icon } from "@joshdschneider/formation";
import convertTime from "../Hooks/convertTime";
import getWiggle from "../Hooks/getWiggle";
import convertDay from "../Hooks/convertDay";
import convertDate from "../Hooks/convertDate";

export default function Hourly(props) {
  const { location, weather, theme, handlePage } = props;

  /**

[
    {
      "dt": 1618315200,
      "temp": 282.58,
      "feels_like": 280.4,
      "pressure": 1019,
      "humidity": 68,
      "dew_point": 276.98,
      "uvi": 1.4,
      "clouds": 19,
      "visibility": 306,
      "wind_speed": 4.12,
      "wind_deg": 296,
      "wind_gust": 7.33,
      "weather": [
        {
          "id": 801,
          "main": "Clouds",
          "description": "few clouds",
          "icon": "02d"
        }
      ],
      "pop": 0
    },

  hourly Hourly forecast weather data API response
hourly.dt Time of the forecasted data, Unix, UTC
hourly.temp Temperature. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit. How to change units used
hourly.feels_like Temperature. This accounts for the human perception of weather. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
hourly.pressure Atmospheric pressure on the sea level, hPa
hourly.humidity Humidity, %
hourly.dew_point Atmospheric temperature (varying according to pressure and humidity) below which water droplets begin to condense and dew can form. Units – default: kelvin, metric: Celsius, imperial: Fahrenheit.
hourly.uvi UV index
hourly.clouds Cloudiness, %
hourly.visibility Average visibility, metres. The maximum value of the visibility is 10km
hourly.wind_speed Wind speed. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour.How to change units used
hourly.wind_gust (where available) Wind gust. Units – default: metre/sec, metric: metre/sec, imperial: miles/hour. How to change units used
chourly.wind_deg Wind direction, degrees (meteorological)
hourly.pop Probability of precipitation. The values of the parameter vary between 0 and 1, where 0 is equal to 0%, 1 is equal to 100%
hourly.rain
hourly.rain.1h (where available) Rain volume for last hour, mm
hourly.snow
hourly.snow.1h (where available) Snow volume for last hour, mm
hourly.weather
hourly.weather.id Weather condition id
hourly.weather.main Group of weather parameters (Rain, Snow, Extreme etc.)
hourly.weather.description Weather condition within the group (full list of weather conditions). Get the output in your language
hourly.weather.icon Weather icon id. How to get icons2
}
*/

  // Render Hour Elements //
  const hourElements = weather.hourly.map((hour, index) => {
    const thisHour = convertTime(
      weather.hourly[weather.hourly.indexOf(hour)].dt,
      weather.time_units,
      true
    );
    let dayBreak = null;
    if (thisHour === "12am") {
      dayBreak = (
        <div className="hour-daybreak">
          <hr />
          {convertDay(hour.dt)} ({convertDate(hour.dt, true)})
          <hr />
        </div>
      );
    }
    return (
      <>
        {dayBreak}
        <Card
          key={`hour${index}`}
          className={`hour-page-card ${
            theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"
          }`}
        >
          <span className="hourly-page-hour">{thisHour}</span>
          <img
            src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
            className="hour-icon"
            alt="weather icon"
            style={{ margin: ".2rem" }}
          />
          <div className="hourly-page-temps">
            <span>
              <Icon
                icon="heart"
                intent="default"
                size="small"
                style={{ fill: "#ff5db4", width: "1rem", height: "1rem" }}
              />
              &nbsp;
              {hour.feels_like}&deg;{hour.temp_units}
            </span>
            <span style={{ color: "gray" }}>{hour.weather[0].main}</span>
          </div>
          <span style={{ marginLeft: "1rem", color: "#4cbcec" }}>
            <Icon
              icon="tint"
              intent="default"
              size="large"
              style={{ fill: "#4cbcec", width: "1.25rem", height: "1.25rem" }}
            />
            {Math.round(hour.pop * 10) / 10}%
          </span>
          <div
            className="wind-day-direction"
            style={{ marginLeft: ".75rem", fontSize: "1.5rem" }}
          >
            <div
              className={`wiggle${getWiggle(hour.wind_speed, hour.wind_units)}`}
            >
              <Icon
                icon="direction-right"
                className={`day-wind-arrow arrow-${hour.wind_direction.toLowerCase()}`}
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
            </div>
            {hour.wind_direction}{" "}
            <span
              className="day-page-wind-units"
              style={{ fontSize: "1.25rem" }}
            >
              {hour.wind_speed}
              <span style={{ fontSize: ".75rem" }}>{hour.wind_units}</span>
            </span>
          </div>
        </Card>
      </>
    );
  });

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
          <span className="page-title">Hourly Forecast</span>
          <span className="page-sub-title">in {location.name}</span>
        </div>
      </div>
      <div className="page-container">
        <div className="page-hourly">{hourElements}</div>
        <div>End of forecast!</div>
      </div>
    </>
  );
}
