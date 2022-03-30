import React from "react";
import { Field, useField }  from 'formik'
import DayPickerInput  from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { DayPickerInputProps } from "react-day-picker/types/Props";



type PickerInputProps = DayPickerInputProps & {
  name: string;
};

export const PickerInput = (props:PickerInputProps) => {
  const { name} = props;
  const [{ value }, , { setValue }] = useField<Date>(name);
  
  const handleDayChange =(day:Date)=>{
    setValue(day)
  }

  return (
    <DayPickerInput {...props}
      value={value}
      onDayChange={handleDayChange} 
    />
  )

  
}
