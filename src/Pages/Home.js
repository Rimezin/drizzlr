import React from "react";
import MainCard from "../Components/MainCard";

export default function Home(props) {
  const { location, weather, units, handleRefresh } = props;
  return (
    <div>
      <MainCard
        handleRefresh={handleRefresh}
        location={location}
        weather={weather}
        units={units}
      />
    </div>
  );
}
