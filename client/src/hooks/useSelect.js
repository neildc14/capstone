import { useState, useEffect } from "react";

const useSelect = (defaultVal = "") => {
  const [value, setValue] = useState(defaultVal);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};

export default useSelect;
