"use client";

import { ConfirmationModal } from "../modals/confirmation_modal";
import {ChatActions} from "./chat_actions";
import {ChatMessagesScreen} from "./chat_messages_screen";
import {ChatScreenHeader} from "./chat_screen_header";
import {EmptyChatScreen} from "./empty_chat_screen";

const ChatScreen = () => {
  return (
    <div className="w-full flex flex-col">
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
