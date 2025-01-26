import { ReactNode } from "react";
import { Controller } from "react-hook-form";
import { Input, Password } from "rizzui";

interface TextFieldProps {
  name: string;
  inputType?:
    | "number"
    | "search"
    | "text"
    | "time"
    | "email"
    | "tel"
    | "url"
    | "date"
    | "week"
    | "month"
    | "datetime-local";
  className?: string;
  label: string;
  placeholder: string;
  size?: "sm" | "md" | "lg" | "xl";
  prefix?: ReactNode;
  suffix?: ReactNode;
  maxLength?: number;
  disabled?: boolean;
  secureTextEntry?: boolean;
  variant?: "outline" | "flat" | "text";
  control: any;
}

export default function TextField({
  name,
  inputType,
  className,
  label,
  placeholder,
  size = "md",
  prefix,
  suffix,
  maxLength,
  disabled,
  variant,
  secureTextEntry,
  control,
}: TextFieldProps) {
  // password type inputs
  if (secureTextEntry) {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Password
            {...field}
            value={field.value}
            className={className}
            label={label}
            placeholder={placeholder}
            size={size}
            prefix={suffix}
            disabled={disabled}
            error={error?.message}
            variant={variant}
          />
        )}
      />
    );
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <Input
          {...field}
          value={field.value}
          type={inputType}
          className={className}
          label={label}
          placeholder={placeholder}
          size={size}
          prefix={suffix}
          suffix={prefix}
          maxLength={maxLength}
          disabled={disabled}
          error={error?.message}
          variant={variant}
        />
      )}
    />
  );
}
