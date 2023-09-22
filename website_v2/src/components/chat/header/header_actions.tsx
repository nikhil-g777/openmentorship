import {performSecondaryButtonAction} from "@/helpers/profile/secondary_button";
import {useChatStore, useProfileStore} from "@/zustand/store";
import {Conversation} from "@twilio/conversations";
import {useSession} from "next-auth/react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import React from "react";

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
  chatType,
  setChatMediaContentModal,
  children,
}: Props) => {
  const token = useSession().data?.user.token || "";
  const router = useRouter();
  const {currentPage, confirmationText, setConfirmationText, setLoading} =
    useProfileStore();
  const {chatId} = useChatStore();

  // Handle end session
  const handleEndSession = async () => {
    await performSecondaryButtonAction({
      currentPage,
      currentTab: "",
      router,
      setLoading,
      secondaryButtonText: "End Session",
      confirmationText,
      setConfirmationText,
      token,
      chatId,
    });
  };

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
          {/* Media Content */}
          <button
            className="btn btn-circle btn-ghost btn-sm p-1 mr-4"
            disabled={chatType === "archive"}
            onClick={() => setChatMediaContentModal(true)}
          >
            <Image
              src="/assets/icons/attachment.svg"
              alt="attachment"
              width={24}
              height={24}
            />
          </button>
          {/* End chat */}
          <button
            className="btn btn-circle btn-error hover:saturate-150 btn-xs"
            onClick={handleEndSession}
            disabled={chatType === "archive"}
          >
            <Image
              src="/assets/icons/power.svg"
              alt="end chat"
              width={24}
              height={24}
            />
          </button>
        </>
      ) : null}
    </>
  );
};

export {HeaderActions};
