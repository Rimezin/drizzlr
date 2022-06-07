import React from "react";
import { Tooltip, Icon } from "@joshdschneider/formation";
import ThemeToggle from "./FormElements/ThemeToggle";

export default function Footer(props) {
  // Props //
  const { theme, toggleTheme } = props;

  const tooltip = {
    version: <span>Visit on GitHub</span>,
  };

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
      <div id="version" className="version">
        <a href="https://github.com/Rimezin/drizzlr" className="version-link">
          v0
          <span
            style={{ color: theme === "light" ? "lightgray" : "dimgray" }}
            className="text-hidden"
          >
            .0.51
          </span>
        </a>
      </div>
      <ThemeToggle
        theme={theme}
        toggleTheme={toggleTheme}
        style={{ marginRight: "1rem" }}
      />
    </div>
  );
}
