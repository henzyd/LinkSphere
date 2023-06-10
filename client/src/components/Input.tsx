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
        onChange={onChange}
        className={` w-full !placeholder:text-2xl ${className}`}
        error={error || false}
        id={id}
        label={label}
        endAdornment={endAdornment || null}
      />
      <FormHelperText
        className={`!text-red-500 !font-semibold !text-sm ${
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
