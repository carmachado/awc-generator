import React, { useRef, useEffect, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import { StyledInput } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
}

const Input: React.FC<Props> = ({ name, label = "", ...rest }: Props) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);
  return (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <StyledInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );
};

Input.defaultProps = {
  label: "",
};

export default Input;
