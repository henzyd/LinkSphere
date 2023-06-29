import React from "react";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInputProps,
} from "@mui/material";

interface InputProps {
  id: OutlinedInputProps["id"];
  label: OutlinedInputProps["label"];
  name: OutlinedInputProps["name"];
  type: OutlinedInputProps["type"];
  error?: OutlinedInputProps["error"];
  helperText?: string;
  className?: OutlinedInputProps["className"];
  value: OutlinedInputProps["value"];
  onChange: OutlinedInputProps["onChange"];
  endAdornment?: OutlinedInputProps["endAdornment"];
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  name,
  type,
  error,
  helperText,
  className,
  value,
  onChange,
  endAdornment,
}) => {
  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <OutlinedInput
        type={type || "text"}
        value={value}
        name={name}
        onChange={onChange}
        className={` w-full !placeholder:text-base ${className}`}
        error={error || false}
        id={id}
        label={label}
        endAdornment={endAdornment || null}
      />
      <FormHelperText
        className={`!text-red-500 !font-medium !text-xs ${
          error ? "visible" : "invisible"
        }`}
        error={error || false}
      >
        {helperText || "Incorrect entry."}
      </FormHelperText>
    </FormControl>
  );
};

export default Input;
