import React from "react";

import { FaPaperPlane } from "react-icons/fa";

type Props = { onSubmit: (message: string) => void };

const MessageForm = ({ onSubmit }: Props) => {
  const [message, setMessage] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-3/4 mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-light rounded-l-lg focus:outline-none"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="p-2 flex items-center gap-2 border  border-light rounded-r-md bg-hover hover:bg-primary text-white transition-colors duration-300"
      >
        Send <FaPaperPlane />
      </button>
    </form>
  );
};

export default MessageForm;
