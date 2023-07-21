"use client";

import {performCardData} from "@/helpers/matches";
import {MatchesProfile} from "@/types/matches";
import {useChatStore, useListingStore, useProfileStore} from "@/zustand/store";
import {Client} from "@twilio/conversations";
import {useEffect} from "react";

type Props = {
  data: MatchesProfile[];
  userType: string;
  chatId: string;
  twilioToken: string;
};

const StoreInitializer = ({data, userType, chatId, twilioToken}: Props) => {
  const {listingData, setListingData, setHeading} = useListingStore();
  const {setUserType} = useProfileStore();
  const {setChatId, setConversations, setChatConnectionStatus, setTwilioToken, setIsTyping} = useChatStore();
  const cardData = performCardData(data, "matches", userType);

  useEffect(() => {
    setListingData(cardData);
    setUserType(userType);
    setHeading("Chats");
    setChatId(chatId);
    setTwilioToken(twilioToken);
    setConversations([]);

    // Init Chats
    const contact = listingData.find(item => item.matches._id === chatId);
    if (contact) {
      const twilioId = contact.matches.latestSession.twilioConversationSid;
      const chats = new Client(twilioToken);
      chats.on("connectionStateChanged", state => {
        setChatConnectionStatus(state);
      });
      chats.getConversationBySid(twilioId).then(conversation => {
        // Fetch messages
        conversation.getMessages().then(messages => {
          setConversations(messages.items);
        });

        // Set is typing
        conversation.on("typingStarted", () => {
          setIsTyping(true);
        }
        );
        conversation.on("typingEnded", () => {
          setIsTyping(false);
        }
        );
      });
    }
  }, [
    data,
    userType,
    chatId,
    setListingData,
    setUserType,
    setHeading,
    setChatId,
    setConversations,
    setChatConnectionStatus,
    setTwilioToken
  ]);

  return null;
};

export {StoreInitializer};
