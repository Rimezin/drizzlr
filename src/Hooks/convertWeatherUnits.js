// Converts all temps in the weather object //

import convertTemp from "./convertTemp";
import convertVolume from "./convertVolume";
import getWindDirection from "./getWindDirection";
import getWindSpeed from "./getWindSpeed";
import getSolarNoon from "./getSolarNoon";

export default function convertWeatherUnits(
  weatherObj,
  prevTempUnits,
  newTempUnits,
  prevWindUnits,
  newWindUnits,
  prevTimeUnits,
  newTimeUnits,
  prevVolumeUnits,
  newVolumeUnits
) {
  console.log(`CONVERTING ALL WEATHER UNITS |`);

  // Convert Daily //
  console.log(`> Converting daily...`);
  const newDaily = weatherObj.daily.map((prevDay, index) => {
    console.log(`>> Compiling new daily object #${index}`);
    return {
      ...prevDay,
      solarnoon: getSolarNoon(prevDay.sunrise, prevDay.sunset),
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
        night: convertTemp(
          prevTempUnits,
          prevDay.feels_like.night,
          newTempUnits
        ),
        eve: convertTemp(prevTempUnits, prevDay.feels_like.eve, newTempUnits),
        morn: convertTemp(prevTempUnits, prevDay.feels_like.morn, newTempUnits),
      },
      wind_units: newWindUnits,
      wind_speed: getWindSpeed(prevWindUnits, prevDay.wind_speed, newWindUnits),
      wind_direction: getWindDirection(prevDay.wind_deg),
      wind_gust: getWindSpeed(prevWindUnits, prevDay.wind_gust, newWindUnits),
      rain: convertVolume(prevVolumeUnits, prevDay.rain, newVolumeUnits),
      snow: convertVolume(prevVolumeUnits, prevDay.snow, newVolumeUnits),
      volume_units: newVolumeUnits,
    };
  });

  // Convert Hourly //
  console.log(`> Converting hourly...`);
  const newHourly = weatherObj.hourly.map((prevHour, index) => {
    console.log(`>> Compiling new hourly object #${index}`);
    let rain = prevHour.rain;
    rain = rain === undefined ? null : rain["1h"];
    let snow = prevHour.snow;
    snow = snow === undefined ? null : snow["1h"];
    return {
      ...prevHour,
      temp: convertTemp(prevTempUnits, prevHour.temp, newTempUnits),
      temp_units: newTempUnits,
      feels_like: convertTemp(prevTempUnits, prevHour.feels_like, newTempUnits),
      wind_units: newWindUnits,
      wind_speed: getWindSpeed(
        prevWindUnits,
        prevHour.wind_speed,
        newWindUnits
      ),
      wind_direction: getWindDirection(prevHour.wind_deg),
      wind_gust: getWindSpeed(prevWindUnits, prevHour.wind_gust, newWindUnits),
      rain: {
        "1h": convertVolume(prevVolumeUnits, rain, newVolumeUnits),
      },
      snow: {
        "1h": convertVolume(prevVolumeUnits, snow, newVolumeUnits),
      },
      volume_units: newVolumeUnits,
    };
  });

  // Construct New Object //
  console.log(`> Constructing new object...`);

  let rain = weatherObj.current.rain;
  rain = rain === undefined ? null : rain["1h"];
  let snow = weatherObj.current.snow;
  snow = snow === undefined ? null : snow["1h"];

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
      rain: {
        "1h": convertVolume(prevVolumeUnits, rain, newVolumeUnits),
      },
      snow: {
        "1h": convertVolume(prevVolumeUnits, snow, newVolumeUnits),
      },
      volume_units: newVolumeUnits,
    },
    daily: newDaily,
    hourly: newHourly,
  };

  console.log(newWeatherObj);

  // Return new object //
  return newWeatherObj;
}
