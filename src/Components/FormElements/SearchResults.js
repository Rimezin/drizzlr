import { Button, Form, Icon, Select } from "@joshdschneider/formation";
import React from "react";

export default function SearchResults(props) {
  const { results, setLocation, setPrompt } = props;

  const [value, setValue] = React.useState(
    `${results[0].name}, ${results[0].state}, ${results[0].country}`
  );

  const options = results.map((result) => ({
    label: `${result.name}, ${result.state}, ${result.country}`,
    value: `${result.name}, ${result.state}, ${result.country}`,
  }));

  function handleChange(event) {
    setValue(event.target.value);
    console.log(`> Changing value to ${event.target.value}`);
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log(`> Submitting choice: ${value}`);
    if (
      value === `${results[0].name}, ${results[0].state}, ${results[0].country}`
    ) {
      setLocation(results[0]);
    } else if (
      value === `${results[1].name}, ${results[1].state}, ${results[1].country}`
    ) {
      setLocation(results[1]);
    } else if (
      value === `${results[2].name}, ${results[2].state}, ${results[2].country}`
    ) {
      setLocation(results[2]);
    } else if (
      value === `${results[3].name}, ${results[3].state}, ${results[3].country}`
    ) {
      setLocation(results[3]);
    } else if (
      value === `${results[4].name}, ${results[4].state}, ${results[4].country}`
    ) {
      setLocation(results[4]);
    } else {
      console.log(`> Selection didn't match. Something went wrong.`);
    }
    setPrompt((prompt) => ({
      ...prompt,
      isOpen: false,
    }));
  }

  return (
    <Form onSubmit={handleSubmit} style={{ margin: "0.5rem" }}>
      <Select options={options} value={value} onChange={handleChange} />
      <Button
        intent="success"
        onClick={handleSubmit}
        rightIcon={<Icon icon="arrow-right" />}
        minimal
        style={{ marginTop: "1rem" }}
      >
        Use this location
      </Button>
    </Form>
  );
}
