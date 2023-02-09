import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Sidebar, ChatScreen } from "@/components";
import { auth, db } from "@/utils/firebase";
import getRecipientEmail from "@/utils/getRecipientEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Chat = ({ messages, chat }) => {
  const [user] = useAuthState(auth);
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(1);

  useEffect(() => {
    console.log("I'm useEffect of chat page");
    const changeBackgroundImage = () => {
      setBackgroundImageIndex((backgroundImageIndex % 9) + 1);
    };

    const intervalId = setInterval(changeBackgroundImage, 10000);
    return () => {
      console.log("I'm cleanup function");
      clearInterval(intervalId);
    };
  }, []);

  const backgroundImage = `/assests/image${backgroundImageIndex}.jpeg`;

  return (
    <div className="min-h-screen flex">
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <div className="flex-1 relative">
        {/* <div
          className="absolute bg-cover opacity-90 top-0 left-0 right-0 bottom-0 -z-10"
          id="chatScreen"
        ></div> */}
        <div
          id="chatScreen"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url("${backgroundImage}")`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            zIndex: -10,
          }}
        >
          <Image
            src={backgroundImage}
            alt="My Background Image"
            loading="lazy"
          />
        </div>
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
