import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import { OptionTypeBase, Props as SelectProps } from "react-select";
import { DivSelect, MultiSelect } from "./styles";

interface Props extends SelectProps<OptionTypeBase> {
  name: string;
  label?: string | undefined;
  underDiv?: boolean;
}
const Select: React.FC<Props> = ({
  name,
  label = "",
  underDiv = false,
  ...rest
}: Props) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      getValue: (ref) => {
        if (!ref.state.value) {
          return "";
        }
        return ref.state.value.value;
      },
      setValue: (ref, value) => {
        ref.select.select.setValue(value);
      },
    });
  }, [fieldName, registerField, defaultValue]);

  const select = (
    <>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <MultiSelect
        defaultValue={defaultValue}
        ref={selectRef}
        classNamePrefix="react-select"
        {...rest}
      />
    </>
  );
  if (underDiv) return <DivSelect>{select}</DivSelect>;

  return <>{select}</>;
};

Select.defaultProps = {
  label: "",
  underDiv: false,
};

export default Select;
