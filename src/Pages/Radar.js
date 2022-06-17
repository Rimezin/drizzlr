import React from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";
import { Button, Icon, Select } from "@joshdschneider/formation";

export default function Radar(props) {
  const { location, theme, handlePage } = props;

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
          <span className="page-title">Map</span>
        </div>
      </div>
      <div className="page-container">
        <MapContainer
          center={[location.lat, location.lon]}
          zoom={9}
          scrollWheelZoom={true}
          style={{ zIndex: "1" }}
        >
          {theme === "light" && (
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          )}
          {theme === "dark" && (
            <TileLayer
              attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
          )}
          <LayersControl position="topright">
            <LayersControl.Overlay checked name="Precipitation">
              <TileLayer
                url={`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Pressure">
              <TileLayer
                url={`https://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Wind">
              <TileLayer
                url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
              />
            </LayersControl.Overlay>
            <LayersControl.Overlay name="Temperature">
              <TileLayer
                url={`https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${process.env.REACT_APP_API_KEY}`}
              />
            </LayersControl.Overlay>
            {/* <LayersControl.Overlay name="TWC">
              <TileLayer
                url={`https://api.weather.com/v3/TileServer/tile/twcRadarMosaic?&xyz=0:0:0&apiKey=${process.env.REACT_APP_TWC_KEY}`}
              />
            </LayersControl.Overlay> */}
          </LayersControl>
        </MapContainer>
      </div>
    </>
  );
}
