import React from "react";
import { Icon } from "@joshdschneider/formation";

export default function Logo(props) {
  const { theme } = props;
  return (
    <>
      <Icon
        icon="rain"
        size="large"
        className="logo-icon no-pointer"
        style={{ height: "2rem", width: "2rem" }}
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
    </>
  );
}
