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
      {/* <Container fluid>
        <Navbar.Brand href="#">clouds.io</Navbar.Brand>
        <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-md`} />
        <Navbar.Offcanvas
          id={`offcanvasNavbar-expand-md`}
          aria-labelledby={`offcanvasNavbarLabel-expand-md`}
          placement="end"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-md`}>
              Main Menu
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3">
              <Nav.Link
                eventKey="Home"
                onClick={handlePage}
                className="link-hover"
                active={page === "Home"}
              >
                Home
              </Nav.Link>
              <Nav.Link
                eventKey="Radar"
                onClick={handlePage}
                className="link-hover"
                active={page === "Radar"}
              >
                Radar
              </Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container> */}
    </>
  );
}
