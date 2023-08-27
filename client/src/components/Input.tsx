import React from "react";
import { OutlinedInput, InputLabel, OutlinedInputProps } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

interface InputProps extends FieldConfig, OutlinedInputProps {
  "data-testid": string;
  name: string;
  value?: string;
}

const Input: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <Field {...props}>
      {({ field, meta }: FieldProps) => (
        <div className="w-full">
          <InputLabel
            htmlFor={props.name}
            className={`${meta.error ? "!text-red-500" : ""}`}
          >
            {label}
          </InputLabel>
          <OutlinedInput
            {...props}
            {...field}
            className={twMerge(`w-full !placeholder:text-base`, className)}
          />
          <ErrorMessage
            name={props.name}
            className={`!text-texts-error !font-medium !text-xs pl-1`}
            component={"p"}
            data-testid={`${props["data-testid"]}-error`}
          />
        </div>
      )}
    </Field>
  );
};

export default Input;
