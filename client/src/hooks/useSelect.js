import { useState, useEffect } from "react";

const useSelect = () => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return [value, handleChange];
};

export default useSelect;
