import { Button, Card, Icon } from "@joshdschneider/formation";
// import { icon } from "leaflet";
import React from "react";
import convertDay from "../../Hooks/convertDay";

export default function DailyCard(props) {
  const { weather, theme, handlePage, handleDay } = props;

  const [dayElements, setDayElements] = React.useState("");

  React.useEffect(() => {
    setDayElements(
      weather.daily.slice(1, 4).map((day, index) => (
        <div
          style={{ cursor: "pointer", textAlign: "center" }}
          onClick={() => {
            handleDay(index + 1);
          }}
          key={`dayCard_${index}`}
        >
          <Card
            key={`day${weather.daily.indexOf(day)}`}
            className={`day-card ${
              theme === "dark" ? "bg-alt-dark" : "bg-alt-mid"
            }`}
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
        </div>
      ))
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
        <span>3-Day Outlook</span>
        <div className="button-header-container">
          <Button
            name="Weekly"
            id="Weekly"
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
      <div className="card-contents daily-contents">
        {/* <Tooltip selector="#wind-direction" content={tooltip.windDirection} /> */}
        {dayElements}
      </div>
    </Card>
  );
}
