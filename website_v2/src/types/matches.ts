import {UserProfile} from "./profile";

type MatchesProfile = {
  initialMessage: string;
  requestMessage?: string;
  status: string;
  latestSession: {
    status: string;
    _id: string;
    match: string;
    requestMessage: string;
    startDate: string;
    twilioConversationSid: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
  };
  _id: string;
  mentee: UserProfile["user"];
  mentor: UserProfile["user"];
};

type MatchesResponse = {
  success: boolean;
  matches: {
    pending: MatchesProfile[];
    active: MatchesProfile[];
    closed: MatchesProfile[];
  };
};

export type {MatchesProfile, MatchesResponse};
