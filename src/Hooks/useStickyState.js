import React from "react";

export default function useStickyState(defaultValue, key) {
  console.log(`STICKYSTATE | Called for ${key}`);

  // Initialize state, use localStorage if it exists //
  const [value, setValue] = React.useState(() => {
    const stickyValue = window.localStorage.getItem(key);
    console.log(`> localStorage value: ${stickyValue}`);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  // Pass state value to localStorage //
  React.useEffect(() => {
    console.log(`> Setting value to ${value}`);
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // Return state and setter function //
  return [value, setValue];
}
