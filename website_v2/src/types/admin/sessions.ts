import {UserProfile} from "../profile";

type SessionData = {
  success: boolean;
  sessions: {
    status: string;
    _id: string;
    match: {
      initialMessage: string;
      status: string;
      latestSession: string;
      _id: string;
      mentee: UserProfile["user"];
      mentor: UserProfile["user"];
      requestMessage: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
    } | null;
    requestMessage: string;
    startDate: string;
    twilioConversationSid: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }[];
};

export type {SessionData};
