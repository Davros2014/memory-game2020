import { useState } from "react";

export default function useToggle(defaultVal) {
  const [state, setState] = useState(defaultVal);
  const toggle = () => {
    setState(!state);
  };
  return [state, toggle];
}
