import React, { useRef, useEffect, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import { StyledInput } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  underDiv?: boolean | "children";
}

const Input: React.FC<Props> = ({
  name,
  label = "",
  type = "input",
  underDiv = false,
  children,
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

  const labelResult = label && <label htmlFor={fieldName}>{label}</label>;
  const errorResult = error && <span className="error">{error}</span>;

  const input = (
    <StyledInput
      id={fieldName}
      ref={inputRef}
      defaultValue={defaultValue}
      type={type}
      {...rest}
    />
  );
  if (underDiv === true)
    return (
      <div>
        {labelResult}
        {input}
        {errorResult}
      </div>
    );

  if (underDiv === "children")
    return (
      <>
        {labelResult}
        <div>
          {input}
          {children}
        </div>
        {errorResult}
      </>
    );

  return (
    <>
      {labelResult}
      {input}
      {errorResult}
    </>
  );
};

Input.defaultProps = {
  label: "",
  underDiv: false,
};

export default Input;
