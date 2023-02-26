import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import * as EmailValidator from "email-validator";
import Avatar from "./Avatar";
import SidebarButtons from "./SidebarButtons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "@/utils/firebase";
import Chats from "./Chats";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email);
  const [chatsSnapshot] = useCollection(userChatRef);

  const createChat = () => {
    const input = prompt(
      "Please enter an email address for the user you want to chat with"
    );

    if (!input) return null;

    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // We need to add the chats into the DB "chats" collection if doesn't already exits and valid
      db.collection("chats").add({
        users: [user.email, input],
      });
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );
  console.log("Side bar rendered!");
  return (
    <div className="px-5 py-3 text-slate-200 h-screen flex flex-col bg-gray-900">
      <div className="flex items-center justify-between py-4 border-b border-slate-200">
        <Avatar photoURL={user.photoURL} />
        <SidebarButtons />
      </div>

      <div className="mt-6 px-1 overflow-y-auto">
        <div className="flex justify-center items-center">
          <button
            onClick={createChat}
            className="rounded-lg bg-gray-800 px-2 py-2 uppercase"
          >
            Create Chat
          </button>
        </div>
        <div className="mt-7 w-[280px] overflow-x-hidden">
          <div className="chats-container flex flex-col gap-5 justify-center">
            {chatsSnapshot?.docs.map((chat) => (
              <Chats key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
