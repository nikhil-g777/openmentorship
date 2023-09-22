"use client";

import {useChatStore} from "@/zustand/store";
import {ConfirmationModal} from "../modals/confirmation_modal";
import {ChatActions} from "./actions/chat_actions";
import {ChatMessagesScreen} from "./chat_messages_screen";
import {ChatScreenHeader} from "./chat_screen_header";
import {EmptyChatScreen} from "./empty_chat_screen";

const ChatScreen = () => {
  const {chatId} = useChatStore();

  return (
    <div
      className={`w-full flex flex-col ${
        chatId === "" ? "hidden md:block" : ""
      }`}
    >
      {/* Chat Header */}
      <ChatScreenHeader />
      {/* Blank Chat Screen */}
      <EmptyChatScreen />
      {/* Chat Messages Screen */}
      <ChatMessagesScreen />
      {/* Chat Actions */}
      <ChatActions />
      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export {ChatScreen};
