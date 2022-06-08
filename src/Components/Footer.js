import React from "react";
import { Tooltip, Icon } from "@joshdschneider/formation";
import ThemeToggle from "./FormElements/ThemeToggle";

export default function Footer(props) {
  // Props //
  const { theme, toggleTheme, openModal } = props;

  const tooltip = {
    version: <span>Release Info</span>,
  };

  function handleVersion() {
    openModal(
      <div>
        <div>
          <p>
            Added daily forecast and hourly forecast in this version. I updated
            this "What's New" modal.
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
      </div>,
      `What's new in v0.0.6?`,
      "rocket"
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
      <Tooltip selector="#version" content={tooltip.version} />
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
          .0.6
        </span>
      </div>

      <small className="attribute">Powered by Open Weather API</small>
      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
        style={{ marginRight: "1rem" }}
      />
    </div>
  );
}
