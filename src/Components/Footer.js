import React from "react";
import { Tooltip, Icon } from "@joshdschneider/formation";
import ThemeToggle from "./FormElements/ThemeToggle";

export default function Footer(props) {
  // Props //
  const { theme, toggleTheme, openModal } = props;

  const tooltip = {
    version: <span>Release Info</span>,
    privacy: <span>Privacy Policy</span>,
  };

  function handleVersion() {
    openModal(
      <div>
        <div>
          <p>
            Added hourly card, corresponding hourly page, and fixed lots of
            minor things.
          </p>
          <br />
        </div>
        <div>
          <a
            href="https://github.com/Rimezin/drizzlr"
            className="version-link"
            target="_blank"
          >
            View on GitHub
          </a>
        </div>
        <small className="attribute">Powered by Open Weather API</small>
      </div>,
      `What's new in v0.0.8?`,
      "rocket"
    );
  }

  function handlePrivacy() {
    openModal(
      <div>
        <p>Drizzlr doesn't collect your information.</p>
        <p>
          Drizzlr stores the unit variables and the location you provide on your
          browser's local storage.
        </p>
        <br />
      </div>,
      `Privacy Policy`,
      "eye-off"
    );
  }

  //// MAIN RENDER ////
  return (
    <div
      className="footerbar"
      style={{
        backgroundColor: theme === "light" ? "#eff2f5" : "#1c2025",
      }}
    >
      <Icon icon="chevron-right" size="large" style={{ fill: "gray" }} />
      <div
        id="version"
        className="version"
        onClick={handleVersion}
        style={{ cursor: "pointer" }}
      >
        v0
        <span
          style={{ color: theme === "light" ? "lightgray" : "dimgray" }}
          className="text-hidden"
        >
          .0.8
        </span>
      </div>
      <Tooltip selector="#version" content={tooltip.version} />
      <Tooltip selector="#privacy" content={tooltip.privacy} />
      <div
        id="privacy"
        className="privacy"
        onClick={handlePrivacy}
        style={{ cursor: "pointer" }}
      >
        <Icon icon="eye-off" size="large" />
      </div>
      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
        style={{ marginRight: "1rem" }}
      />
    </div>
  );
}
