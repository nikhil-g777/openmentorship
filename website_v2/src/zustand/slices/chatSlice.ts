import {UserProfile} from "@/types/profile";
import {Client, Conversation, Message, Paginator} from "@twilio/conversations";
import {StateCreator} from "zustand";

// Types
export type ChatSlice = {
  archiveListingData: [] | UserProfile["user"][];
  setArchiveListingData: (
    archiveListingData: [] | UserProfile["user"][]
  ) => void;
  archiveHeader: string;
  setArchiveHeader: (archiveHeader: string) => void;
  client: Client | null;
  setClient: (client: Client | null) => void;
  currentConversation: Conversation | null;
  setCurrentConversation: (currentConversation: Conversation | null) => void;
  chatId: string;
  setChatId: (chatId: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  conversations: Paginator<Message> | null;
  setConversations: (conversations: Paginator<Message> | null) => void;
  chatConnectionStatus: string;
  setChatConnectionStatus: (chatConnectionStatus: string) => void;
  twilioToken: string;
  setTwilioToken: (twilioToken: string) => void;
  typingStatus: {participant: string; isTyping: boolean};
  setTypingStatus: (typingStatus: {
    participant: string;
    isTyping: boolean;
  }) => void;
};

// Initial state
const initialState = {
  archiveListingData: [],
  archiveHeader: "",
  client: null,
  currentConversation: null,
  chatId: "",
  firstName: "",
  profileImage: "",
  conversations: null,
  chatConnectionStatus: "",
  twilioToken: "",
  typingStatus: {participant: "", isTyping: false},
};

export const chatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = set => ({
  ...initialState,
  // Actions
  // Set data
  setArchiveListingData: (archiveListingData: [] | UserProfile["user"][]) =>
    set({archiveListingData}),
  setArchiveHeader: (archiveHeader: string) => set({archiveHeader}),
  setClient: (client: Client | null) => set({client}),
  setCurrentConversation: (currentConversation: Conversation | null) =>
    set({currentConversation}),
  setChatId: (chatId: string) => set({chatId}),
  setFirstName: (firstName: string) => set({firstName}),
  setProfileImage: (profileImage: string) => set({profileImage}),
  setConversations: (conversations: Paginator<Message> | null) =>
    set({conversations}),
  setChatConnectionStatus: (chatConnectionStatus: string) =>
    set({chatConnectionStatus}),
  setTwilioToken: (twilioToken: string) => set({twilioToken}),
  setTypingStatus: (typingStatus: {participant: string; isTyping: boolean}) =>
    set({typingStatus}),
});
