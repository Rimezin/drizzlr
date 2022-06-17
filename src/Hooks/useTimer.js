import React from "react";

export default function useTimer(startSeconds, endFunction) {
  // Timer //
  const [seconds, setSeconds] = React.useState(startSeconds);

  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
        console.log(`%c$Timer: ${seconds}`, "color: magenta;");
      } else if (seconds === 0) {
        clearInterval(myInterval);
        console.log(
          `%c$Time's up, executing end funciton!'`,
          "color: magenta;"
        );

        endFunction();
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, [seconds]);

  return [seconds, setSeconds];
}
