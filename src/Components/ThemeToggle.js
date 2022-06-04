import React from "react";
import { Icon, Switch } from "@joshdschneider/formation";

export default function ThemeToggle(props) {
  const { theme, toggleTheme } = props;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Icon
        icon="flash"
        intent="default"
        size="regular"
        style={{ marginRight: "0.5rem" }}
      />
      <Switch
        size="regular"
        checked={theme === "dark" ? true : null}
        onChange={toggleTheme}
      />
      <Icon
        icon="moon"
        intent="default"
        size="regular"
        style={{ marginLeft: "-0.25rem", marginRight: "1rem" }}
      />
    </div>
  );
}
