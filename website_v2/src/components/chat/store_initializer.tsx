"use client";

import {performCardData} from "@/helpers/matches";
import {MatchesProfile} from "@/types/matches";
import {
  useChatStore,
  useCommonStore,
  useListingStore,
  useProfileStore,
} from "@/zustand/store";
import {Client} from "@twilio/conversations";
import {useRouter} from "next/navigation";
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
  twilioToken: string;
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
    // Check if data and token is available
    if (!data.success || !token) {
      setErrorAlert("Error getting data! Redirecting you to homepage.", 6);
      router.replace("/");
      return;
    }
    // Check if twilio token is available
    if (twilioToken === "") {
      setErrorAlert("Error getting twilio token, Try reloading the page", 6);
      return;
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
    setCurrentPage("chat");
    setUserType(userType);
    setHeading("Chats");
    setArchiveHeader("Archived Chats");
    setChatId(chatId);
    setProfileChatId(chatId);
    setToken(token);
    setTwilioToken(twilioToken);
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
    if (twilioToken === "") {
      setErrorAlert("Error getting twilio token, Try reloading the page", 6);
      return;
    }

    // Init chat
    const client: Client = new Client(twilioToken);

    // Set successfull chat connection
    client.on("initialized", () => {
      setSuccessAlert("Connected!", 6);
      setClient(client);
    });

    // Set failed chat connection
    client.on("initFailed", () => {
      setErrorAlert(
        "Error establishing chat connection, Try reloading the page",
        6
      );
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
