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
    <form onSubmit={handleSubmit} className="flex w-3/4 gap-3 mx-auto">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="flex-1 p-2 border border-light rounded-l-lg rounded-tr-lg rounded-bl-none focus:outline-none"
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="p-4 flex items-center border border-light rounded-full bg-main hover:bg-hover text-white transition-colors duration-300"
      >
        <FaPaperPlane size={20} />
      </button>
    </form>
  );
};

export default MessageForm;
