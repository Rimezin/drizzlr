import React from "react";
import { Navbar, Container, Nav, Offcanvas } from "react-bootstrap";
import Search from "./Search";
import Logo from "./Logo";
import { Button, Icon } from "@joshdschneider/formation";
import ThemeToggle from "./ThemeToggle";

export default function MenuBar(props) {
  // Props //
  const {
    handleDrawer,
    theme,
    toggleTheme,
    page,
    handlePage,
    location,
    getLocation,
    searching,
  } = props;

  //// MAIN RENDER ////
  return (
    <>
      <div
        className="menubar"
        style={{
          backgroundColor: theme === "light" ? "#eff2f5" : "#1c2025",
        }}
      >
        <Logo />
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        <Button onClick={handleDrawer}>
          <Icon icon="menu" />
        </Button>
      </div>
    </>
  );
}
