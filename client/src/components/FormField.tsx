import React from "react";
import { OutlinedInput, InputLabel, OutlinedInputProps, FormControl } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

interface InputProps extends OutlinedInputProps, FieldConfig {
  "data-testid": string;
  name: string;
  value?: string;
}

const FormField: React.FC<InputProps> = ({ label, className, ...props }) => {
  return (
    <FormControl className="w-full">
      <Field {...props}>
        {({ field, meta }: FieldProps) => (
          <>
            <InputLabel
              htmlFor={props.id}
              className={`!text-sm ${meta.touched && !!meta.error ? "!text-red-500" : ""}`}
            >
              {label}
              {props.required && <span className="!text-[#d32f2f] !text-[0.9rem] pl-1">*</span>}
            </InputLabel>
            <OutlinedInput
              {...props}
              {...field}
              className={twMerge(
                `w-full !placeholder:text-base `,
                meta.touched && !!meta.error ? "!border-red-500" : "",
                className,
              )}
            />
            <ErrorMessage
              name={props.name}
              className={`!text-red-500 !font-medium !text-xs pl-1`}
              component={"p"}
              data-testid={`${props["data-testid"]}-error`}
            />
          </>
        )}
      </Field>
    </FormControl>
  );
};

export default FormField;
