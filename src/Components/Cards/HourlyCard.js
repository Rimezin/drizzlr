import { Button, Card, Icon } from "@joshdschneider/formation";
import React from "react";
import convertTime from "../../Hooks/convertTime";

export default function HourlyCard(props) {
  const { weather, theme, handlePage } = props;

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

  const [hourElements, setHourElements] = React.useState("");

  // Render Hour Elements //
  React.useEffect(() => {
    setHourElements(
      weather.hourly.slice(1, 4).map((hour, index) => {
        const hourTime = convertTime(
          weather.hourly[weather.hourly.indexOf(hour)].dt,
          weather.time_units,
          true
        );

        return (
          <Card
            key={`hour${index}`}
            className={`hour-card ${
              theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"
            }`}
          >
            <span className="hourly-card-hour">{hourTime}</span>
            <img
              src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
              className="day-icon"
              alt="weather icon"
              style={{ margin: ".5rem" }}
            />
            <div className="hourly-card-temps">
              <span>
                <Icon
                  icon="heart"
                  intent="default"
                  size="small"
                  style={{ fill: "#ff5db4", width: "0.7rem", height: "0.7rem" }}
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
                size="small"
                style={{ fill: "#4cbcec", width: "0.7rem", height: "0.7rem" }}
              />
              {Math.floor(hour.pop * 100)}%
            </span>
          </Card>
        );
      })
    );
  }, [weather]);

  return (
    <Card style={{ width: "18rem", maxWidth: "76%" }} interactive={true}>
      <div
        className={`card-header ${
          theme === "light" ? "bg-alt-light" : "bg-alt-dark"
        }`}
        style={{ borderColor: theme === "light" ? "#d3d8de" : "#383e47" }}
      >
        <span>Next Few Hours</span>
        <div className="button-header-container">
          <Button
            name="Hourly"
            id="Hourly"
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
      </div>
      <div className="card-contents hourly-contents">{hourElements}</div>
    </Card>
  );
}
