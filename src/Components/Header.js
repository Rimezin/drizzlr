import React from "react";
import Logo from "./Logo";
import { Button, Icon } from "@joshdschneider/formation";

export default function Header(props) {
  // Props //
  const { handleDrawer, theme, handlePage, page, width } = props;

  //// MAIN RENDER ////
  return (
    <div
      className="menubar"
      style={{
        backgroundColor: theme === "light" ? "#eff2f5" : "#1c2025",
      }}
    >
      <div
        id="Home"
        name="Home"
        onClick={handlePage}
        className="logo-container"
      >
        <Logo theme={theme} handlePage={handlePage} />
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {width >= 512 && (
          <Button
            name="Home"
            minimal
            intent={page === "Home" ? "disabled" : "primary"}
            onClick={handlePage}
            style={{
              justifyContent: "left",
              userSelect: "none",
              pointerEvents: page === "Home" ? "none" : null,
            }}
          >
            Home
          </Button>
        )}
        {width >= 512 && (
          <Button
            name="Radar"
            minimal
            intent={page === "Radar" ? "disabled" : "primary"}
            onClick={handlePage}
            style={{
              justifyContent: "left",
              userSelect: "none",
              pointerEvents: page === "Radar" ? "none" : null,
            }}
          >
            Map
          </Button>
        )}
        {width >= 512 && (
          <Button
            name="Hourly"
            minimal
            intent={page === "Hourly" ? "disabled" : "primary"}
            onClick={handlePage}
            style={{
              justifyContent: "left",
              userSelect: "none",
              pointerEvents: page === "Hourly" ? "none" : null,
            }}
          >
            Hourly
          </Button>
        )}
        {width >= 512 && (
          <Button
            name="Weekly"
            minimal
            intent={page === "Weekly" ? "disabled" : "primary"}
            onClick={handlePage}
            style={{
              justifyContent: "left",
              userSelect: "none",
              pointerEvents: page === "Weekly" ? "none" : null,
            }}
          >
            Weekly
          </Button>
        )}
        <Button onClick={handleDrawer} style={{ margin: "0 1.5rem 0 1.5rem" }}>
          <Icon icon="menu" />
        </Button>
      </div>
    </div>
  );
}
