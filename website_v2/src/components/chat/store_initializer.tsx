"use client";

import {ERROR_ALERT, PAGES, SUCCESS_ALERT} from "@/constants/common";
import {performCardData} from "@/helpers/matches";
import {MatchesProfile} from "@/types/matches";
import {
  useChatStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {Client} from "@twilio/conversations";
import {notFound, useRouter} from "next/navigation";
import {useEffect} from "react";

type Props = {
  token: string | undefined | null;
  data: {
    success: boolean;
    matches: {
      pending: MatchesProfile[];
      active: MatchesProfile[];
      closed: MatchesProfile[];
    };
  };
  userType: string;
  chatId: string;
  twilioToken: {
    success: boolean;
    twilioToken: string;
  };
};

const StoreInitializer = ({
  token,
  data,
  userType,
  chatId,
  twilioToken,
}: Props) => {
  const router = useRouter();
  const {setListingData, setHeading} = useListingStore();
  const {
    setCurrentPage,
    setUserType,
    setChatId: setProfileChatId,
    setToken,
  } = useProfileStore();
  const {
    setArchiveListingData,
    setArchiveHeader,
    setChatId,
    setChatConnectionStatus,
    setTwilioToken,
    setClient,
  } = useChatStore();
  const {setErrorAlert, setSuccessAlert} = useCommonStore();

  useEffect(() => {
    // Redirect if data not found
    if (!token) {
      setErrorAlert(ERROR_ALERT.REDIRECT_HOMEPAGE, 6);
      router.replace("/");
      return;
    }
    // Check if twilio token is available
    if (!data.success || !twilioToken.success) {
      notFound();
    }

    const cardData = performCardData(
      data.matches["active"],
      "matches",
      userType
    );
    const archiveData = performCardData(
      data.matches["closed"],
      "matches",
      userType
    );
    setListingData(cardData);
    setArchiveListingData(archiveData);
    setCurrentPage(PAGES.CHAT);
    setUserType(userType);
    setHeading("Chats");
    setArchiveHeader("Archived Chats");
    setChatId(chatId);
    setProfileChatId(chatId);
    setToken(token);
    setTwilioToken(twilioToken?.twilioToken || "");
  }, [
    router,
    data,
    userType,
    setListingData,
    setArchiveListingData,
    setUserType,
    setHeading,
    setArchiveHeader,
    setChatId,
    setTwilioToken,
    setCurrentPage,
    setProfileChatId,
    setToken,
    token,
    chatId,
    twilioToken,
    setErrorAlert,
  ]);

  useEffect(() => {
    // Check if twilio token is available
    if (!twilioToken.success) {
      notFound();
    }

    // Init chat
    const client: Client = new Client(twilioToken?.twilioToken || "");

    // Set successfull chat connection
    client.on("initialized", () => {
      setSuccessAlert(SUCCESS_ALERT.CHAT_CONNECTED, 6);
      setClient(client);
    });

    // Set failed chat connection
    client.on("initFailed", () => {
      setErrorAlert(ERROR_ALERT.CHAT_ESTABLISH, 6);
      setClient(null);
    });

    // Set chat connection status
    client.on("connectionStateChanged", state => {
      setChatConnectionStatus(state);
    });
  }, [
    twilioToken,
    setSuccessAlert,
    setErrorAlert,
    setClient,
    setChatConnectionStatus,
  ]);

  return null;
};

export {StoreInitializer};
