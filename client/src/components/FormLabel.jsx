import React from "react";

const FormLabel = ({ htmlFor, label }) => {
  return (
    <label htmlFor={htmlFor} className="text-lg font-semibold text-green-1100">
      {label}
    </label>
  );
};

export default FormLabel;
