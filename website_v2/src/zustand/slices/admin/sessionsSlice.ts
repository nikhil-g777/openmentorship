import {SessionData} from "@/types/admin/sessions";
import {StateCreator} from "zustand";

// Types
export type SessionSlice = {
  // States
  sessionData: SessionData["sessions"] | null;
  searchData: SessionData["sessions"] | null;
  // Actions
  setSessionData: (sessionData: SessionData["sessions"] | null) => void;
  setSearchData: (searchData: SessionData["sessions"] | null) => void;
};

// Initial state
const initialState = {
  sessionData: null,
  searchData: null,
};

export const sessionSlice: StateCreator<
  SessionSlice,
  [],
  [],
  SessionSlice
> = set => ({
  ...initialState,
  // Actions
  setSessionData: (sessionData: SessionData["sessions"] | null) => {
    set(() => ({
      sessionData,
    }));
  },
  setSearchData: (searchData: SessionData["sessions"] | null) => {
    set(() => ({
      searchData,
    }));
  },
});
