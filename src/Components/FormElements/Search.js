import React from "react";
import { Form, Input, Button } from "@joshdschneider/formation";

export default function Search(props) {
  const { searching, location, getLocation, disabled } = props;
  const [value, setValue] = React.useState(location.zip);

  function handleChange(event) {
    setValue(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    getLocation(value);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        value={value}
        onChange={handleChange}
        style={{
          maxWidth: "8rem",
          textAlign: "center",
          marginRight: "0.5rem",
        }}
        disabled={disabled === true ? true : null}
      />
      <Button
        intent="primary"
        loading={searching ? true : null}
        disabled={disabled === true ? true : null}
      >
        Search
      </Button>
    </Form>
  );
}
