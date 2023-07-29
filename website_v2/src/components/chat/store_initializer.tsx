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
import {useSession} from "next-auth/react";
import {useEffect} from "react";

type Props = {
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

const StoreInitializer = ({data, userType, chatId, twilioToken}: Props) => {
  const token = useSession().data?.user.token || "";
  const {setListingData, setHeading} = useListingStore();
  const {
    setCurrentPage,
    setUserType,
    setChatId: setProfileChatId,
    setToken,
  } = useProfileStore();
  const {setChatId, setChatConnectionStatus, setTwilioToken, setClient} =
    useChatStore();
  const {setErrorAlert, setSuccessAlert} = useCommonStore();

  useEffect(() => {
    // Check if twilio token is available
    if (twilioToken === "") {
      setErrorAlert("Error getting twilio token, Try reloading the page", 6);
      return;
    }

    // Check if data is successful
    if (!data.success) {
      setErrorAlert("Error getting chat data, Try reloading the page", 6);
      return;
    }
    const cardData = performCardData(
      data.matches["active"],
      "matches",
      userType
    );
    setListingData(cardData);
    setCurrentPage("chat");
    setUserType(userType);
    setHeading("Chats");
    setChatId(chatId);
    setProfileChatId(chatId);
    setToken(token);
    setTwilioToken(twilioToken);
  }, [
    data,
    userType,
    setListingData,
    setUserType,
    setHeading,
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
