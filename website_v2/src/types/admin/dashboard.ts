import {UserProfile} from "../profile";

type StatsData = {
  success: boolean;
  menteeCount: number;
  mentorCount: number;
  matchCounts: {
    active: number;
    pending: number;
    closed: number;
  };
};

type UsersData = {
  currentPage: string;
  success: boolean;
  totalPages: number;
  users: UserProfile["user"][];
};

export type {StatsData, UsersData};
