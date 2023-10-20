import React, { ChangeEvent } from "react";
import "./InputField.scss";

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
    <div
      className="input-field__container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        width: "100%",
        gap: 10,
      }}
    >
      <span className="input-field__name">{name}</span>
      <input
        className="input-field__value"
        type={getInputType()}
        defaultValue={defaultValue}
        onChange={handleChange}
        style={{ width: "100%", boxSizing: "border-box" }}
        autoFocus
      ></input>
      {error && <span className="input-field__error">{error}</span>}
    </div>
  );
}

export default InputField;
