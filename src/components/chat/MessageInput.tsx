import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

type Props = {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldValues;
  onSubmit: () => void;
};

const MessageForm = (props: Props) => {
  return (
    <textarea
      id={props.id}
      autoComplete={"off"}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          props.onSubmit();
        }
      }}
      {...props.register(props.id, { required: props.required })}
      className="flex-1 p-2 h-[42px] text-dark border border-light rounded-tr-lg rounded-bl-none text-wrap focus:outline-none resize-none  overflow-auto whitespace-nowrap"
      placeholder={props.placeholder}
    />
  );
};

export default MessageForm;
