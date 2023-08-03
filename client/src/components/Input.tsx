import React from "react";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInputProps,
} from "@mui/material";

interface InputProps extends OutlinedInputProps {
  helperText?: string | null;
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
  required,
}) => {
  return (
    <FormControl className="w-full" variant="outlined">
      <InputLabel htmlFor={id} className={`${error && "!text-red-500"}`}>
        {label}
      </InputLabel>
      <OutlinedInput
        type={type || "text"}
        value={value}
        name={name}
        onChange={onChange}
        className={` w-full !placeholder:text-base ${className}`}
        error={error || false}
        id={id}
        label={label}
        required={required || false}
        endAdornment={endAdornment || null}
      />
      <FormHelperText
        className={`!text-red-500 !font-medium !text-xs ${
          error ? "block" : "hidden"
        }`}
        error={error || false}
      >
        {helperText || "Incorrect entry."}
      </FormHelperText>
    </FormControl>
  );
};

export default Input;
