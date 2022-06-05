import { Button, Icon } from "@joshdschneider/formation";
import React from "react";
import Search from "../Components/Search";
import ThemeToggle from "../Components/ThemeToggle";
import Units from "../Components/Units";
import UnitsWind from "../Components/UnitsWind";

export default function DrawerContent(props) {
  const {
    page,
    handlePage,
    searching,
    location,
    getLocation,
    units,
    windUnits,
    handleWindUnits,
    handleUnits,
    theme,
    toggleTheme,
  } = props;

  const selected = <Icon icon="arrow-left" intent="default" size="small" />;

  const icon = {
    home: <Icon icon="home" intent="default" size="regular" />,
    radar: <Icon icon="scatter-plot" intent="default" size="regular" />,
  };

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
          Radar
        </Button>
      </div>
      <br />
      <p>Location:</p>
      <Search
        searching={searching}
        location={location}
        getLocation={getLocation}
      />
      <br />
      <p>Temperature Units:</p>
      <Units units={units} handleUnits={handleUnits} />
      <br />
      <br />
      <p>Wind Speed Units:</p>
      <UnitsWind windUnits={windUnits} handleWindUnits={handleWindUnits} />
      <br />
      <br />
      <p>Theme:</p>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </div>
  );
}
