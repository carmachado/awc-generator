import React, { useRef, useEffect, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import { StyledInput } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  underDiv?: boolean;
}

const Input: React.FC<Props> = ({
  name,
  label = "",
  type = "input",
  underDiv = false,
  ...rest
}: Props) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
    });
  }, [fieldName, registerField]);

  const input = (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <StyledInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        type={type}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </>
  );

  if (underDiv) return <div>{input}</div>;

  return <>{input}</>;
};

Input.defaultProps = {
  label: "",
  underDiv: false,
};

export default Input;
