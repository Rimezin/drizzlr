import React from "react";
import MainCard from "../Components/Cards/MainCard";
import WindCard from "../Components/Cards/WindCard";

export default function Home(props) {
  const { location, weather, units, handleRefresh, theme } = props;
  return (
    <div className="page-home">
      <MainCard
        handleRefresh={handleRefresh}
        location={location}
        weather={weather}
        units={units}
        theme={theme}
      />
      <WindCard
        location={location}
        weather={weather}
        units={units}
        theme={theme}
      />
    </div>
  );
}
