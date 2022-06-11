import React from "react";
import { Overlay } from "@joshdschneider/formation";

export default function Layover(props) {
  const { overlay } = props;

  return (
    <Overlay
      isOpen={overlay.isOpen}
      onClose={overlay.onClose}
      focus={overlay.focus}
      closeOnEscapeKey={overlay.closeOnEscapeKey}
      closeOnOuterClick={overlay.closeOnOuterClick}
    >
      {overlay.contents}
    </Overlay>
  );
}
