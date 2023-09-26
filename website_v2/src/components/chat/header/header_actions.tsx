import {Conversation} from "@twilio/conversations";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";
import {ChatMenuWrapper} from "./chat_menu_wrapper";

type Props = {
  currentConversation: Conversation | null;
  firstName: string;
  typingStatus: {
    isTyping: boolean;
    participant: string;
  };
  userId: string;
  chatType: string | null;
  setChatMediaContentModal: (value: boolean) => void;
  children?: React.ReactNode;
};

const HeaderActions = ({
  currentConversation,
  firstName,
  typingStatus,
  userId,
  children,
}: Props) => {
  const router = useRouter();

  // Handle back
  const handleBack = () => {
    router.push("/chat");
  };

  return (
    <>
      {/* Mobile back button */}
      <button
        className="md:hidden btn btn-circle btn-outline hover:btn-primary btn-sm my-4 mr-4"
        onClick={handleBack}
      >
        <Image
          src="/assets/icons/arrow.svg"
          alt="back"
          width={24}
          height={24}
          className="rotate-90 p-1"
        />
      </button>
      {currentConversation && firstName && firstName.length ? (
        <>
          {children}
          <h3 className="w-full font-lg sm:text-xl font-semibold px-4 py-4 bg-base-200 truncate">
            {firstName}
            {/* Show typing indicator */}
            {typingStatus.isTyping && typingStatus.participant === userId ? (
              <span className="mx-2 text-xs opacity-50">typing…</span>
            ) : null}
          </h3>
          {/* Chat Menu */}
          <ChatMenuWrapper />
        </>
      ) : null}
    </>
  );
};

export {HeaderActions};
