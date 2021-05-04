import React, { useRef, useState, useEffect } from "react";
import { ReactDatePickerProps } from "react-datepicker";
import { useField } from "@unform/core";
import "react-datepicker/dist/react-datepicker.css";
import { StyledDatePicker } from "./styles";

interface Props extends Omit<ReactDatePickerProps, "onChange"> {
  name: string;
}
const DatePicker: React.FC<Props> = ({ name, ...rest }: Props) => {
  const datepickerRef = useRef(null);
  const { fieldName, registerField, defaultValue } = useField(name);
  const [date, setDate] = useState(defaultValue || null);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: datepickerRef.current,
      clearValue: (ref) => {
        ref.clear();
      },
      setValue: (ref, value) => {
        if (value) ref.setSelected(new Date(value.toString()));
        else ref.clear();
      },
      getValue: (ref) => {
        return ref.props.selected;
      },
    });
  }, [fieldName, registerField, date]);

  useEffect(() => setDate(defaultValue ? new Date(defaultValue) : null), [
    defaultValue,
  ]);

  return (
    <StyledDatePicker
      ref={datepickerRef}
      selected={date}
      onChange={setDate}
      {...rest}
      dateFormat="yyyy-MM-dd"
      showPopperArrow={false}
      todayButton="today"
      showMonthDropdown
      showYearDropdown
      isClearable
    />
  );
};
export default DatePicker;
