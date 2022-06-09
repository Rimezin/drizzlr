import { Icon } from "@joshdschneider/formation";
import React from "react";

export default function Logo(props) {
  const { theme, handlePage } = props;
  return (
    <div id="Home" name="Home" onClick={handlePage} className="logo-container">
      <Icon
        icon="rain"
        size="large"
        className="logo-icon no-pointer"
        style={{ height: "32px", width: "32px" }}
      />
      <div className="logo no-pointer">
        Drizzlr
        <span
          style={{ color: theme === "light" ? "lightgray" : "dimgray" }}
          className="text-hidden"
        >
          .app
        </span>
      </div>
    </div>
  );
}
