import {StatsData} from "@/types/admin/dashboard";
import {StateCreator} from "zustand";

// Types
export type DashboardSlice = {
  // States
  statsData: StatsData | null;
  // Actions
  setStatsData: (statsData: StatsData) => void;
};

// Initial state
const initialState = {
  statsData: null,
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
});
