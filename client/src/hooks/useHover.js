import { useState } from "react";

const useHover = () => {
  const [hover, setHover] = useState(false);

  const bind = {
    onMouseEnter: () => {
      setHover(!hover);
    },
    onMouseLeave: () => {
      setHover(!hover);
    },
  };

  return [hover, bind];
};

export default useHover;
