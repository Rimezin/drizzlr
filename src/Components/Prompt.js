import { Button, Icon } from "@joshdschneider/formation";
import React from "react";

export default function Prompt(props) {
  const { prompt, setPrompt, theme } = props;

  function handleClose() {
    setPrompt((prompt) => ({
      ...prompt,
      isOpen: false,
    }));
  }

  return (
    <div
      className="prompt-container"
      style={{ display: prompt.isOpen === true ? "flex" : "none" }}
    >
      <div
        id="prompt"
        className={`prompt ${
          theme === "light" ? "prompt-light" : "prompt-dark"
        } drizzlr-modal`}
      >
        <div className="modal-header">
          <div className="header-text">
            <Icon icon={prompt.icon} size="regular" />
            {prompt.title}
          </div>
          <Button className="header-close" onClick={handleClose}>
            <Icon icon="cross" size="regular" />
          </Button>
        </div>
        <div class="modal-children">
          <div>{prompt.content}</div>
        </div>
      </div>
    </div>
  );
}
