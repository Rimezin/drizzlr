import React from "react";
import useTimer from "../Hooks/useTimer";
import Logo from "./Logo";
import { Button } from "@joshdschneider/formation";

export default function Timer(props) {
  const { handleOverlay, handleRefresh, handlePage, theme } = props;

  const [timer, setTimer] = useTimer(600, () => {
    handleOverlay({
      isOpen: true,
      contents: (
        <div className="overlay-div">
          <div className="logo-container-overlay">
            <Logo
              theme={theme}
              handlePage={handlePage}
              style={{ fill: "white!important" }}
            />
          </div>
          <br />
          <p>
            This data is stale. Click the refresh button below to get a new
            batch!
          </p>
          <br />
          <Button onClick={handleOverlayRefresh}>Refresh</Button>
        </div>
      ),
    });
  });

  function handleOverlayRefresh(e) {
    handleRefresh(e);
    handleOverlay({
      isOpen: false,
    });
    setTimer(600);
    console.log("Overlay Refreshed !!");
  }

  return <div className="timer">{timer}</div>;
}
