import {StatsData, UsersData} from "@/types/admin/dashboard";
import {UserProfile} from "@/types/profile";
import {StateCreator} from "zustand";

// Types
export type DashboardSlice = {
  // States
  statsData: StatsData | null;
  usersData: UsersData | null;
  userInfo: UserProfile["user"] | null;
  // Actions
  setStatsData: (statsData: StatsData) => void;
  setUsersData: (usersData: UsersData | null) => void;
  setUserInfo: (userInfo: UserProfile["user"] | null) => void;
};

// Initial state
const initialState = {
  statsData: null,
  usersData: null,
  userInfo: null,
};

export const dashboardSlice: StateCreator<
  DashboardSlice,
  [],
  [],
  DashboardSlice
> = set => ({
  ...initialState,
  // Actions
  setStatsData: (statsData: StatsData) => {
    set(() => ({
      statsData,
    }));
  },
  setUsersData: (usersData: UsersData | null) => {
    set(() => ({
      usersData,
    }));
  },
  setUserInfo: (userInfo: UserProfile["user"] | null) => {
    set(() => ({
      userInfo,
    }));
  },
});
