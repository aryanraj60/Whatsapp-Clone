import React from "react";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import Avatar from "./Avatar";
import { useRouter } from "next/router";

const Chats = ({ users, id }) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipientEmail(users, user))
  );

  const recipient = recipientSnapshot?.docs?.[0]?.data();
  const recipientEmail = getRecipientEmail(users, user);

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <div
      onClick={enterChat}
      className="flex items-center px-1 group relative hover:bg-gray-800 rounded-xl cursor-pointer justify-start gap-2 break-words"
    >
      {recipient ? (
        <Avatar photoURL={recipient?.photoURL} />
      ) : (
        <div className="py-2 px-4 bg-gray-700 rounded-full">
          {recipientEmail[0]}
        </div>
      )}
      <p className="">{recipientEmail}</p>
    </div>
  );
};

export default Chats;
