import {StateCreator} from "zustand";

// Types
export type ChatSlice = {
  chatId: string;
  setChatId: (chatId: string) => void;
  firstName: string;
  setFirstName: (firstName: string) => void;
  profileImage: string;
  setProfileImage: (profileImage: string) => void;
  conversations: any[];
  setConversations: (conversations: any[]) => void;
  chatConnectionStatus: string;
  setChatConnectionStatus: (chatConnectionStatus: string) => void;
  twilioToken: string;
  setTwilioToken: (twilioToken: string) => void;
  typingStatus: {participant: string; isTyping: boolean};
  setTypingStatus: (typingStatus: {participant: string; isTyping: boolean}) => void;
};

// Initial state
const initialState = {
  chatId: "",
  firstName: "",
  profileImage: "",
  conversations: [],
  chatConnectionStatus: "",
  twilioToken: "",
  typingStatus: {participant: "", isTyping: false}
};

export const chatSlice: StateCreator<ChatSlice, [], [], ChatSlice> = set => ({
  ...initialState,
  // Actions
  // Set data
  setChatId: (chatId: string) => set({chatId}),
  setFirstName: (firstName: string) => set({firstName}),
  setProfileImage: (profileImage: string) => set({profileImage}),
  setConversations: (conversations: any[]) => set({conversations}),
  setChatConnectionStatus: (chatConnectionStatus: string) =>
    set({chatConnectionStatus}),
  setTwilioToken: (twilioToken: string) => set({twilioToken}),
  setTypingStatus: (typingStatus: {participant: string; isTyping: boolean}) =>
    set({typingStatus})
});
