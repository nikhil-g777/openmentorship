"use client";

import {useChatStore} from "@/zustand/store";
import Image from "next/image";

const EmptyChatScreen = () => {
  const {chatId} = useChatStore();
  return (
    <>
      {chatId && chatId.length ? null : (
        <div className="w-full h-full relative hidden md:block">
          <Image
            src="/assets/images/chatScreen.svg"
            alt="chat_blank_screen"
            fill={true}
            className="w-full max-w-sm mx-auto opacity-50 px-4"
          />
          <h3 className="absolute bottom-10 block w-full font-lg text-center px-4 py-4">
            Select a contact to start a conversation
          </h3>
        </div>
      )}
    </>
  );
};

export {EmptyChatScreen};
