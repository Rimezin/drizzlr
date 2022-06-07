import { Icon } from "@joshdschneider/formation";
import React from "react";

export default function Logo(props) {
  const { theme } = props;
  return (
    <>
      <Icon
        icon="rain"
        size="large"
        className="logo-icon"
        style={{ height: "32px", width: "32px" }}
      />
      <div className="logo">
        Drizzlr
        <span
          style={{ color: theme === "light" ? "lightgray" : "dimgray" }}
          className="text-hidden"
        >
          .app
        </span>
      </div>
    </>
  );
}
