import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/utils/firebase";

const Message = ({ user, message }) => {
  const [userLoggedIn] = useAuthState(auth);

  const isSender = userLoggedIn.email === user ? true : false;

  return (
    <div>
      <p
        className={`w-fit p-2 my-4 rounded-lg min-w-[60px] text-center bg-slate-100 text-black ${
          isSender && "ml-auto bg-yellow-300"
        }`}
      >
        {message.message}
      </p>
    </div>
  );
};

export default Message;
