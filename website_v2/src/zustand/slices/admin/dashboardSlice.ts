import {StatsData, UsersData} from "@/types/admin/dashboard";
import {StateCreator} from "zustand";

// Types
export type DashboardSlice = {
  // States
  statsData: StatsData | null;
  usersData: UsersData | null;
  // Actions
  setStatsData: (statsData: StatsData) => void;
  setUsersData: (usersData: UsersData) => void;
};

// Initial state
const initialState = {
  statsData: null,
  usersData: null,
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
  setUsersData: (usersData: UsersData) => {
    set(() => ({
      usersData,
    }));
  },
});
