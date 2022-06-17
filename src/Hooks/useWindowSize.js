import React from "react";

export default function useWindowSize() {
  // Define size object state //
  const [size, setSize] = React.useState({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    // Define setter function //
    function handleResize() {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Attach Event Listener //
    window.addEventListener("resize", handleResize);

    // Call function //
    handleResize();

    // Return function to remove event listener //
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Return the size object state //
  return [size.width, size.height];
}
