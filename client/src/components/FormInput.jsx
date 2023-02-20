import React from "react";

const FormInput = ({ type, name, onChangeHook, autocomplete = "" }) => {
  return (
    <input
      type={type}
      className="w-full py-2 px-2 border-2 active:border-3 focus:border-3 outline-2 active:outline-green-300 hover:outline-green-300 focus:outline-green-300  rounded "
      name={name}
      autocomplete={autocomplete}
      {...onChangeHook}
    />
  );
};

export default FormInput;
