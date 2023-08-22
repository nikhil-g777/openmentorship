import {StateCreator} from "zustand";

// Types
export type FilterSlice = {
  staticFilters: string[];
  setStaticFilters: (staticFilters: string[]) => void;
  allFilters: string[];
  setAllFilters: (allFilters: string[]) => void;
  currentFilters: string[];
  setCurrentFilters: (currentFilters: string[]) => void;
  areasOfInterest: string[];
  setAreasOfInterest: (areasOfInterest: string[]) => void;
  goals: string[];
  setGoals: (goals: string[]) => void;
  communicationFrequency: string[];
  setCommunicationFrequency: (communicationFrequency: string[]) => void;
  communicationPreferences: string[];
  setCommunicationPreferences: (communicationPreferences: string[]) => void;
  isFiltered: boolean;
  setIsFiltered: (isFiltered: boolean) => void;
};

// Initial state
const initialState = {
  staticFilters: [],
  allFilters: [],
  currentFilters: [],
  areasOfInterest: [],
  goals: [],
  communicationFrequency: [],
  communicationPreferences: [],
  isFiltered: true,
};

export const filterSlice: StateCreator<
  FilterSlice,
  [],
  [],
  FilterSlice
> = set => ({
  ...initialState,
  // Actions
  setStaticFilters: (staticFilters: string[]) => {
    set(() => ({
      staticFilters: staticFilters,
    }));
  },
  setAllFilters: (allFilters: string[]) => {
    set(() => ({
      allFilters: allFilters,
    }));
  },
  setCurrentFilters: (currentFilters: string[]) => {
    set(() => ({
      currentFilters: currentFilters,
    }));
  },
  setAreasOfInterest: (areasOfInterest: string[]) => {
    set(() => ({
      areasOfInterest: areasOfInterest,
    }));
  },
  setGoals: (goals: string[]) => {
    set(() => ({
      goals: goals,
    }));
  },
  setCommunicationFrequency: (communicationFrequency: string[]) => {
    set(() => ({
      communicationFrequency: communicationFrequency,
    }));
  },
  setCommunicationPreferences: (communicationPreferences: string[]) => {
    set(() => ({
      communicationPreferences: communicationPreferences,
    }));
  },
  setIsFiltered: (isFiltered: boolean) => {
    set(() => ({
      isFiltered: isFiltered,
    }));
  },
});
