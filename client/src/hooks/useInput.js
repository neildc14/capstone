import { useState } from "react";

const useInput = () => {
  const [value, setValue] = useState("");

  const bind = {
    value,
    onChange: (e) => {
      setValue(e.target.value);
    },
  };

  return [value, bind];
};

export default useInput;
