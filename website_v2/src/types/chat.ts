import {Conversation} from "@twilio/conversations";
import {ChangeEvent} from "react";

// Handle Send Message
type HandleSendMessage = {
  e: React.FormEvent<HTMLFormElement>;
  message: string;
  setMessage: (message: string) => void;
  setErrorAlert: (errorAlert: string, time: number) => void;
  setChatConnectionStatus: (chatConnectionStatus: string) => void;
  currentConversation: Conversation | null;
};

// Handle File Input
type HandleFileInput = {
  e: ChangeEvent<HTMLInputElement>;
  setChatAttachment: (chatAttachment: File | null | undefined) => void;
  setErrorAlert: (errorAlert: string, time: number) => void;
  setChatAttachmentModal: (chatAttachmentModal: boolean) => void;
};

export type {HandleSendMessage, HandleFileInput};
