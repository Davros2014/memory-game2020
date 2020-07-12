import { useState, useEffect } from "react";

function useLocalStorageState(key, defaultVal) {
  // make piece of state in local storage
  const [val, updateVal] = useState(() => {
    let val;
    try {
      val = JSON.parse(window.localStorage.getItem(key) || String(defaultVal));
    } catch (e) {
      val = defaultVal;
    }
    return val;
  });
  // use effact and update local storage storage
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(val));
  }, [key, val]);
  return [val, updateVal];
}
export default useLocalStorageState;
