import { useState } from "react";

export default initialVal => {
  const [value, setValue] = useState(initialVal);
  const handleChange = event => {
    setValue(event.target.value);
  };
  return [value, handleChange];
};
