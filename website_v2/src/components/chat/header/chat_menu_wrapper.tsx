import {performSecondaryButtonAction} from "@/helpers/profile/secondary_button";
import {useChatStore, useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {useRouter, useSearchParams} from "next/navigation";

const ChatMenuWrapper = () => {
  const token = useSession().data?.user.token || "";
  const chatType = useSearchParams().get("type");
  const router = useRouter();
  const {setChatMediaContentModal, chatIndicator, setChatIndicator} =
    useChatStore();
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

  // Handle Media
  const handleMedia = () => {
    setChatMediaContentModal(true);
    setChatIndicator(false);
  };
  return (
    <>
      {/* Media Button for Desktop */}
      <div className="indicator hidden md:block mr-4 mt-[2px]">
        {chatIndicator ? (
          <span className="indicator-item badge badge-xs badge-primary"></span>
        ) : null}
        {/* button */}
        <button
          onClick={handleMedia}
          className="btn btn-ghost btn-xs flex-nowrap items-center gap-1.5 px-4"
        >
          <Image
            src="/assets/icons/menu.svg"
            alt="media"
            width={20}
            height={20}
          />
          Media
        </button>
      </div>

      {/* Menu Container */}
      <div className="indicator">
        {chatIndicator ? (
          <span className="indicator-item badge badge-xs badge-primary md:hidden"></span>
        ) : null}
        <div className="dropdown dropdown-end">
          {/* Menu */}
          <label tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
            <Image
              src="/assets/icons/dots.svg"
              alt="chat-menu"
              width={24}
              height={24}
            />
          </label>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {/* Media */}
            <li onClick={handleMedia} className="md:hidden">
              <button className="justify-between">
                Media
                {chatIndicator ? (
                  <span className="badge badge-primary">New</span>
                ) : null}
              </button>
            </li>
            {/* Chat Home */}
            <li>
              <Link href="/chat">Chat Home</Link>
            </li>
            {/* End Session */}
            <li
              onClick={handleEndSession}
              className={chatType === "archive" ? "disabled" : ""}
            >
              <button className="hover:bg-error">End Session</button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export {ChatMenuWrapper};
