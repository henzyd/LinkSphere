import React from "react";
import { TextField, TextFieldProps } from "@mui/material";

interface InputProps {
  id: TextFieldProps["id"];
  label: TextFieldProps["label"];
  type: TextFieldProps["type"];
  error?: TextFieldProps["error"];
  helperText?: TextFieldProps["helperText"];
  className?: TextFieldProps["className"];
  value: TextFieldProps["value"];
  onChange: TextFieldProps["onChange"];
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  error,
  helperText,
  className,
  value,
  onChange,
}) => {
  return (
    <TextField
      type={type || "text"}
      value={value}
      onChange={onChange}
      className={` w-full !placeholder:text-2xl ${className}`}
      error={error || false}
      id={id}
      label={label}
      helperText={helperText || "Incorrect entry."}
    />
  );
};

export default Input;
