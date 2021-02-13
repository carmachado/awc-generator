/* eslint-disable no-param-reassign */
import React, { useRef, useEffect, InputHTMLAttributes } from "react";
import { useField } from "@unform/core";

import { DivCheckbox, StyledInput } from "./styles";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string | undefined;
  underDiv?: boolean;
}

const CheckboxInput: React.FC<Props> = ({
  name,
  label = "",
  underDiv = false,
  ...rest
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "checked",
    });
  }, [defaultValue, fieldName, registerField]);
  const input = (
    <>
      <StyledInput
        defaultChecked={defaultValue}
        ref={inputRef}
        type="checkbox"
        id={fieldName}
        {...rest}
      />
      {label && <label htmlFor={fieldName}>{label}</label>}
    </>
  );

  if (underDiv) {
    return <DivCheckbox>{input}</DivCheckbox>;
  }

  return <>{input}</>;
};

CheckboxInput.defaultProps = {
  label: "",
  underDiv: false,
};

export default CheckboxInput;
