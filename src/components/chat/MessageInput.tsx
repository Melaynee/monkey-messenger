import { cn } from "@/lib/utils";
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
  replyMessage?: boolean;
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
      className={cn(
        "flex-1 p-2 h-full text-dark border border-light rounded-tr-lg rounded-bl-none text-wrap focus:outline-none resize-none  overflow-auto whitespace-nowrap w-full",
        (props.replyMessage || "") && "rounded-none"
      )}
      placeholder={props.placeholder}
    />
  );
};

export default MessageForm;
