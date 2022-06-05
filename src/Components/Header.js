import React from "react";
import Logo from "./Logo";
import { Button, Icon } from "@joshdschneider/formation";

export default function Header(props) {
  // Props //
  const { handleDrawer, theme } = props;

  //// MAIN RENDER ////
  return (
    <>
      <div
        className="menubar"
        style={{
          backgroundColor: theme === "light" ? "#eff2f5" : "#1c2025",
        }}
      >
        <Logo theme={theme} />
        <Button onClick={handleDrawer} style={{ marginRight: "1.5rem" }}>
          <Icon icon="menu" />
        </Button>
      </div>
    </>
  );
}
