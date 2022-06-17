import React from "react";

export default function useStickyState(defaultValue, key) {
  // Initialize state, use localStorage if it exists //
  const [value, setValue] = React.useState(() => {
    console.log(`%cSTICKYSTATE | Called for ${key}`, "color: cyan;");
    const stickyValue = window.localStorage.getItem(key);
    console.log(`%c> localStorage value: ${stickyValue}`, "color: cyan;");

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  // Pass state value to localStorage //
  React.useEffect(() => {
    console.log(`%cSTICKYSTATE | Called for ${key}`, "color: cyan;");
    console.log(`%c> Setting value to ${value}`, "color: cyan;");
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return state and setter function //
  return [value, setValue];
}
