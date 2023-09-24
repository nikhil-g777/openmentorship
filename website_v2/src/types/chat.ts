import {Conversation, Message, Paginator} from "@twilio/conversations";
import {ChangeEvent, Dispatch, SetStateAction} from "react";

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

// Media Content
type MediaContent = {
  category: string;
  contentType: string;
  filename: string;
  sid: string;
  size: number;
  url: string;
}[];

// Message Added
type MessageAdded = {
  message: Message;
  setMediaContent: Dispatch<SetStateAction<MediaContent>>;
  setErrorAlert: (errorAlert: string, time: number) => void;
};

// Media Content
type SetMediaContent = {
  setTempConversations: (
    value: SetStateAction<Paginator<Message> | null>
  ) => void;
  currentConversation: Conversation | null;
  setMediaContent: (value: SetStateAction<MediaContent>) => void;
  setErrorAlert: (errorAlert: string, time: number) => void;
};

// Media Content Observer
type MediaContentObserver = {
  observer: IntersectionObserver;
  entries: IntersectionObserverEntry[];
  setLoader: (value: SetStateAction<boolean>) => void;
  tempConversations: Paginator<Message>;
  setTempConversations: (
    value: SetStateAction<Paginator<Message> | null>
  ) => void;
  setMediaContent: (value: SetStateAction<MediaContent>) => void;
  setErrorAlert: (errorAlert: string, time: number) => void;
};

export type {
  HandleSendMessage,
  HandleFileInput,
  MediaContent,
  MessageAdded,
  SetMediaContent,
  MediaContentObserver,
};
