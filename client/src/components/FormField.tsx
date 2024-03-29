import React from "react";
import { OutlinedInput, InputLabel, OutlinedInputProps, FormControl } from "@mui/material";
import { ErrorMessage, Field, FieldConfig, FieldProps } from "formik";
import { twMerge } from "tailwind-merge";

interface InputProps extends OutlinedInputProps, FieldConfig {
  "data-testid": string;
  name: string;
  value?: string;
  containerClassName?: string;
}

const FormField: React.FC<InputProps> = ({ label, className, containerClassName, ...props }) => {
  return (
    <FormControl className={twMerge(`w-full`, containerClassName)}>
      <Field {...props}>
        {({ field, meta }: FieldProps) => (
          <>
            <InputLabel
              htmlFor={props.id}
              className={`!text-sm bg-white !px-[0.4rem] ${
                meta.touched && !!meta.error ? "!text-red-500" : ""
              }`}
            >
              {label}
              {props.required && <span className="!text-[#d32f2f] !text-[0.9rem] pl-1">*</span>}
            </InputLabel>
            <OutlinedInput
              {...props}
              {...field}
              className={twMerge(
                `w-full !placeholder:text-base `,
                meta.touched && !!meta.error ? "[&_fieldset]:!border-red-500" : "",
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
