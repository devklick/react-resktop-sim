import React, { ChangeEvent } from "react";

import { StyledContainer, StyledInput } from "./styles";

interface InputFieldProps<T> {
  name: string;
  type: "string" | "number";
  defaultValue?: string | number;
  onChange: (value: T) => void;
  error: string | null;
}

function InputField<T>({
  name,
  type,
  defaultValue,
  error,
  onChange,
}: InputFieldProps<T>) {
  function getInputType(): React.HTMLInputTypeAttribute {
    switch (type) {
      case "number":
        return "number";
      case "string":
      default:
        return "text";
    }
  }
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    onChange(event.currentTarget.value as T);
  }

  return (
    <StyledContainer>
      <span>{name}</span>
      <StyledInput
        type={getInputType()}
        defaultValue={defaultValue}
        onChange={handleChange}
        autoFocus
      />
      {error && <span className="input-field__error">{error}</span>}
    </StyledContainer>
  );
}

export default InputField;
