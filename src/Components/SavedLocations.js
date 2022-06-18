import { Button, Icon, Select } from "@joshdschneider/formation";
import React from "react";
import useStickyState from "../Hooks/useStickyState";

export default function SavedLocations(props) {
  const { location, setLocation, setGeolocator, handleDrawer } = props;

  const [saved, setSaved] = useStickyState([], "drizzlr-savedlocations");

  const options = saved.map((loc) => ({
    label: loc.name,
    value: loc,
  }));

  function handleSavedLocation(e) {
    setGeolocator(false);
    console.log(e);
    handleDrawer();
    setLocation(e.target.value);
  }

  function handleAddLocation() {
    if (saved.length === 5) {
      saved.pop();
    }
    setSaved((saved) => {
      return [location, ...saved];
    });
  }

  return (
    <div>
      <h5>Saved Locations:</h5>
      <br />
      <Select
        options={options}
        value={saved[0]}
        onChange={handleSavedLocation}
      />
      <Button
        id="addLocation"
        onClick={handleAddLocation}
        minimal
        leftIcon={<Icon icon="plus" />}
        intent="success"
      >
        Add selected location
      </Button>
    </div>
  );
}
