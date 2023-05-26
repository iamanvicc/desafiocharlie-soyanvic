  /* eslint-disable */
import React from "react";

import { InputField, InputContainer, Img } from "./styled";

import Compass from "./Compass.svg";

// Type do Input
interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const Input: React.FC<InputProps> = ({ value, onChange, onBlur }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      target: {
        value: event.target.value.replace(/[^a-zA-Z, ]/g, ""),
      },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <InputContainer>
      <Img src={Compass} alt="Compass" />
      <InputField
        id="input"
        type="text"
        value={value}
        onChange={handleInputChange}
        onBlur={onBlur}
      />
    </InputContainer>
  );
};

export default Input;
