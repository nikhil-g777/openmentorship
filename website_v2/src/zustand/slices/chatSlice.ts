import {MediaContent} from "@/types/chat";
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
  chatAttachmentModal: boolean;
  setChatAttachmentModal: (chatAttachmentModal: boolean) => void;
  chatAttachment: File | null | undefined;
  setChatAttachment: (chatAttachment: File | null | undefined) => void;
  chatMediaContentModal: boolean;
  setChatMediaContentModal: (chatMediaContentModal: boolean) => void;
  messagesAttachmentCompleted: boolean[];
  setMessagesAttachmentCompleted: (
    messagesAttachmentCompleted: boolean[]
  ) => void;
  mediaConversations: Paginator<Message> | null;
  setMediaConversations: (
    mediaConversations: Paginator<Message> | null
  ) => void;
  mediaContent: MediaContent;
  setMediaContent: (mediaContent: MediaContent) => void;
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
  chatAttachmentModal: false,
  chatAttachment: null,
  chatMediaContentModal: false,
  messagesAttachmentCompleted: [],
  mediaConversations: null,
  mediaContent: [],
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
  setChatAttachmentModal: (chatAttachmentModal: boolean) =>
    set({chatAttachmentModal}),
  setChatAttachment: (chatAttachment: File | null | undefined) =>
    set({chatAttachment}),
  setChatMediaContentModal: (chatMediaContentModal: boolean) =>
    set({chatMediaContentModal}),
  setMessagesAttachmentCompleted: (messagesAttachmentCompleted: boolean[]) =>
    set({messagesAttachmentCompleted}),
  setMediaConversations: (mediaConversations: Paginator<Message> | null) =>
    set({mediaConversations}),
  setMediaContent: (mediaContent: MediaContent) => set({mediaContent}),
});
