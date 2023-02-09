import React, { useEffect } from "react";
import Head from "next/head";
import { Sidebar, ChatScreen } from "@/components";
import { auth, db } from "@/utils/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = ({ messages, chat }) => {
  const [user] = useAuthState(auth);

  useEffect(() => {
    console.log("I'm useffect of chat page");
    const bgElement = document.getElementById("chatScreen");
    bgElement.style.backgroundImage = "url('/assests/image1.jpeg')";

    let currentImageIndex = 1;

    const changeBackgroundImage = () => {
      // Update the current image index
      currentImageIndex = (currentImageIndex % 9) + 1;

      // Set the background image
      bgElement.style.backgroundImage =
        "url('/assests/image" + currentImageIndex + ".jpeg')";
    };

    const intervalId = setInterval(changeBackgroundImage, 10000);

    return () => {
      console.log("I'm cleanup function");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <div className="flex-1 relative">
        <div
          className="absolute bg-cover opacity-90 top-0 left-0 right-0 bottom-0 -z-10"
          id="chatScreen"
        ></div>
        <ChatScreen chat={chat} messages={messages} />
      </div>
    </div>
  );
};

export default Chat;

export async function getServerSideProps(context) {
  const ref = db.collection("chats").doc(context.query.id);

  //Fetch The Message on The Server before serving the page to the client

  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  const messages = messagesRes.docs
    .map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    })
    .map((messages) => {
      return {
        ...messages,
        timestamp: messages.timestamp.toDate().getTime(),
      };
    });

  //Chats Data
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };

  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}