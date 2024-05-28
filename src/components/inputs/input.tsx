"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { FieldErrors, UseFormRegister, FieldValues } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <div>
      <label
        htmlFor={props.id}
        className="block text-sm font-medium leading-6 text-dark tracking-wide"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          id={props.id}
          type={props.type}
          autoComplete={props.id}
          disabled={props.disabled}
          {...props.register(props.id, { required: props.required })}
          className={cn(
            "form-input block w-full rounded-md border-0 70 p-1.5 text-dark shadow-sm ring-1 ring-inset ring-dark/20 placeholder:text-dark/70 focus:ring-2 focus:ring-inset focus:ring-main sm:text-sm sm:leading-6",
            props.errors[props.id] && "focus:ring-rose-500",
            props.disabled && "opacity-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
