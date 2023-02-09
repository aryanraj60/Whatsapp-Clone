import { auth } from "@/utils/firebase";
import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdAttachFile } from "react-icons/md";
import { FiMoreVertical } from "react-icons/fi";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import { db } from "@/utils/firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import TimeAgo from "timeago-react";

const ChatScreen = ({ chat, messages }) => {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const [messagesSnapshot] = useCollection(
    db
      .collection("chats")
      .doc(router.query.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
  );
  const [recipientSnapshot] = useCollection(
    db
      .collection("users")
      .where("email", "==", getRecipientEmail(chat.users, user))
  );

  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot.docs.map((message) => {
        return (
          <Message
            key={message.id}
            user={message.data().user}
            message={{
              ...message.data(),
              timestamp: message.data().timestamp?.toDate().getTime(),
            }}
          />
        );
      });
    } else {
      return JSON.parse(messages).map((message) => (
        <Message key={message.id} user={message.user} message={message} />
      ));
    }
  };

  const sendMessage = (e, input) => {
    e.preventDefault();

    //Update the user last seen
    db.collection("users").doc(user.uid).set(
      {
        lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );

    db.collection("chats").doc(router.query.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      user: user.email,
      photoURL: user.photoURL,
    });
  };

  //Recipient Details
  const recipient = recipientSnapshot?.docs?.[0]?.data();

  return (
    <div className="text-slate-50 px-5 py-4 h-screen flex flex-col">
      <div className="Header flex justify-between items-center">
        <div className="flex gap-4">
          {recipient ? (
            <img
              src={recipient.photoURL}
              class="rounded-full w-12"
              alt="Avatar"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="py-3 px-5 bg-gray-700 rounded-full">
              {getRecipientEmail(chat.users, user)[0]}
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-lg text-gray-100 font-bold">
              {getRecipientEmail(chat.users, user)}
            </p>
            <p className="text-sm text-gray-300">
              Last Active:{" "}
              {recipient?.lastSeen?.toDate() ? (
                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
              ) : (
                "Unavailable"
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <MdAttachFile
            size={28}
            className="cursor-pointer hover:text-blue-600"
          />
          <FiMoreVertical
            size={28}
            className="cursor-pointer hover:text-blue-600"
          />
        </div>
      </div>

      <div className="messages-container overflow-y-auto min-h-[80vh] flex-1 py-3">
        {showMessages()}
      </div>

      <SendMessage sendMessage={sendMessage} />
    </div>
  );
};

export default ChatScreen;
