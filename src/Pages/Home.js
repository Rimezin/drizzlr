import React from "react";
import MainCard from "../Components/Cards/MainCard";
import WindCard from "../Components/Cards/WindCard";

export default function Home(props) {
  const { location, weather, handleRefresh, theme, openModal } = props;
  return (
    <div className="page-home">
      <MainCard
        handleRefresh={handleRefresh}
        location={location}
        weather={weather}
        theme={theme}
        openModal={openModal}
      />
      <WindCard location={location} weather={weather} theme={theme} />
    </div>
  );
}
