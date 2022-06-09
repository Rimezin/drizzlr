// Converts all temps in the weather object //

import convertTemp from "./convertTemp";
import getWindDirection from "./getWindDirection";
import getWindSpeed from "./getWindSpeed";

export default function convertWeatherUnits(
  weatherObj,
  prevTempUnits,
  newTempUnits,
  prevWindUnits,
  newWindUnits,
  prevTimeUnits,
  newTimeUnits
) {
  console.log(
    `CONVERTING ALL WEATHER UNITS | Wind: ${prevWindUnits} to ${newWindUnits} ... Temp: ${prevTempUnits} to ${newTempUnits}`
  );

  // Convert Daily //
  console.log(`|| Converting daily...`);
  const newDaily = weatherObj.daily.map((prevDay) => ({
    ...prevDay,
    temp: {
      day: convertTemp(prevTempUnits, prevDay.temp.day, newTempUnits),
      min: convertTemp(prevTempUnits, prevDay.temp.min, newTempUnits),
      max: convertTemp(prevTempUnits, prevDay.temp.max, newTempUnits),
      night: convertTemp(prevTempUnits, prevDay.temp.night, newTempUnits),
      eve: convertTemp(prevTempUnits, prevDay.temp.eve, newTempUnits),
      morn: convertTemp(prevTempUnits, prevDay.temp.morn, newTempUnits),
      units: newTempUnits,
    },
    dew_point: convertTemp(prevTempUnits, prevDay.dew_point, newTempUnits),
    feels_like: {
      day: convertTemp(prevTempUnits, prevDay.feels_like.day, newTempUnits),
      night: convertTemp(prevTempUnits, prevDay.feels_like.night, newTempUnits),
      eve: convertTemp(prevTempUnits, prevDay.feels_like.eve, newTempUnits),
      morn: convertTemp(prevTempUnits, prevDay.feels_like.morn, newTempUnits),
    },
    wind_units: newWindUnits,
    wind_speed: getWindSpeed(prevWindUnits, prevDay.wind_speed, newWindUnits),
    wind_direction: getWindDirection(prevDay.wind_deg),
    wind_gust: getWindSpeed(prevWindUnits, prevDay.wind_gust, newWindUnits),
  }));

  // Convert Hourly //
  console.log(`|| Converting hourly...`);
  const newHourly = weatherObj.hourly.map((prevHour) => ({
    ...prevHour,
    temp: convertTemp(prevTempUnits, prevHour.temp, newTempUnits),
    temp_units: newTempUnits,
    feels_like: convertTemp(prevTempUnits, prevHour.feels_like, newTempUnits),
    wind_units: newWindUnits,
    wind_speed: getWindSpeed(prevWindUnits, prevHour.wind_speed, newWindUnits),
    wind_direction: getWindDirection(prevHour.wind_deg),
    wind_gust: getWindSpeed(prevWindUnits, prevHour.wind_gust, newWindUnits),
  }));

  // Construct New Object //
  console.log(`|| Constructing new object...`);
  const newWeatherObj = {
    ...weatherObj,
    time_units: newTimeUnits === null ? prevTimeUnits : newTimeUnits,
    current: {
      ...weatherObj.current,
      temp_units: newTempUnits,
      temp: convertTemp(prevTempUnits, weatherObj.current.temp, newTempUnits),
      feels_like: convertTemp(
        prevTempUnits,
        weatherObj.current.feels_like,
        newTempUnits
      ),
      wind_speed: getWindSpeed(
        prevWindUnits,
        weatherObj.current.wind_speed,
        newWindUnits
      ),
      wind_units: newWindUnits,
      wind_direction: getWindDirection(weatherObj.current.wind_deg),
    },
    daily: newDaily,
    hourly: newHourly,
  };

  console.log(newWeatherObj);

  // Return new object //
  return newWeatherObj;
}
