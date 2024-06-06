import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
};

const MessageForm = (props: Props) => {
  return (
    <input
      id={props.id}
      type="text"
      autoComplete={"off"}
      {...props.register(props.id, { required: props.required })}
      className="flex-1 p-2 text-dark border border-light rounded-tr-lg rounded-bl-none focus:outline-none"
      placeholder={props.placeholder}
    />
  );
};

export default MessageForm;
