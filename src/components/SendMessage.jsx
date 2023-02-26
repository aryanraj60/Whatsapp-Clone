import React, { useState } from "react";
import { BiWinkSmile } from "react-icons/bi";
import { BsMic } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";

const SendMessage = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  return (
    <form className="message-input-container flex items-center p-3">
      <BiWinkSmile size={28} />

      <input
        placeholder="Write your message"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={input}
        className="outline-none flex-1 rounded-xl p-2 mx-3 bg-gray-800"
      />
      <button
        className="hidden"
        type="submit"
        onClick={(e) => {
          sendMessage(e, input);
          setInput("");
        }}
      >
        Send
      </button>

      <IoIosSend size={25} />
    </form>
  );
};

export default SendMessage;
