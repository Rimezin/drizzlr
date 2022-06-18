import { Button, Icon, Switch } from "@joshdschneider/formation";
import React from "react";
import Search from "../Components/FormElements/Search";
import ThemeToggle from "../Components/FormElements/ThemeToggle";
import TempUnits from "../Components/FormElements/TempUnits";
import UnitsWind from "../Components/FormElements/UnitsWind";
import UnitsTime from "../Components/FormElements/UnitsTime";
import UnitsVolume from "../Components/FormElements/UnitsVolume";
import SavedLocations from "../Components/SavedLocations";

export default function DrawerContent(props) {
  const {
    page,
    handlePage,
    searching,
    location,
    getLocation,
    setLocation,
    handleDrawer,
    tempUnits,
    windUnits,
    timeUnits,
    handleWindUnits,
    handleTempUnits,
    handleTimeUnits,
    theme,
    toggleTheme,
    volumeUnits,
    handleVolumeUnits,
    geolocator,
    setGeolocator,
  } = props;

  const selected = <Icon icon="arrow-left" intent="default" size="small" />;

  const icon = {
    home: <Icon icon="home" intent="default" size="regular" />,
    radar: <Icon icon="scatter-plot" intent="default" size="regular" />,
    weekly: <Icon icon="calendar" intent="default" size="regular" />,
    hourly: <Icon icon="time" intent="default" size="regular" />,
  };

  function handleGeolocator() {
    setGeolocator((geo) => !geo);
  }

  const [savedSwitch, setSavedSwitch] = React.useState(false);

  function handleSavedSwitch() {
    setSavedSwitch((state) => !state);
  }

  return (
    <div>
      <div className="menu-items">
        <Button
          name="Home"
          minimal
          intent="primary"
          leftIcon={icon.home}
          rightIcon={page === "Home" ? selected : null}
          onClick={handlePage}
          style={{
            justifyContent: "left",
            userSelect: "none",
            pointerEvents: page === "Home" ? "none" : null,
          }}
        >
          Home
        </Button>
        <Button
          name="Radar"
          minimal
          intent="primary"
          leftIcon={icon.radar}
          rightIcon={page === "Radar" ? selected : null}
          onClick={handlePage}
          style={{
            justifyContent: "left",
            userSelect: "none",
            pointerEvents: page === "Radar" ? "none" : null,
          }}
        >
          Map
        </Button>
        <Button
          name="Hourly"
          minimal
          intent="primary"
          leftIcon={icon.hourly}
          rightIcon={page === "Hourly" ? selected : null}
          onClick={handlePage}
          style={{
            justifyContent: "left",
            userSelect: "none",
            pointerEvents: page === "Hourly" ? "none" : null,
          }}
        >
          Hourly
        </Button>
        <Button
          name="Weekly"
          minimal
          intent="primary"
          leftIcon={icon.weekly}
          rightIcon={page === "Weekly" || page === "Day" ? selected : null}
          onClick={handlePage}
          style={{
            justifyContent: "left",
            userSelect: "none",
            pointerEvents: page === "Weekly" ? "none" : null,
          }}
        >
          Weekly
        </Button>
      </div>
      <br />
      <hr />
      {/* <Button
        onClick={handleSavedSwitch}
        rightIcon={<Icon icon="chevron-right" />}
        minimal
        intent="success"
      >
        Saved
      </Button> */}

      {!savedSwitch && (
        <>
          <h5>Location:</h5>
          <Search
            searching={searching}
            location={location}
            getLocation={getLocation}
            disabled={geolocator}
          />
          <br />
          <Switch
            label="Use Current Location"
            size="regular"
            checked={geolocator === true ? true : null}
            onChange={handleGeolocator}
          />
        </>
      )}
      {savedSwitch && (
        <SavedLocations
          location={location}
          setLocation={setLocation}
          setGeolocator={setGeolocator}
          handleDrawer={handleDrawer}
        />
      )}
      <br />
      <hr />
      <h5>Units</h5>
      <div className="menu-units">
        <p>Temperature:</p>
        <TempUnits tempUnits={tempUnits} handleTempUnits={handleTempUnits} />
      </div>
      <div className="menu-units">
        <p>Volume:</p>
        <UnitsVolume
          volumeUnits={volumeUnits}
          handleVolumeUnits={handleVolumeUnits}
        />
      </div>
      <div className="menu-units">
        <p>Speed:</p>
        <UnitsWind windUnits={windUnits} handleWindUnits={handleWindUnits} />
      </div>
      <div className="menu-units">
        <p>Time:</p>
        <UnitsTime timeUnits={timeUnits} handleTimeUnits={handleTimeUnits} />
      </div>
      <br />
      <hr />
      <h5>Theme:</h5>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
