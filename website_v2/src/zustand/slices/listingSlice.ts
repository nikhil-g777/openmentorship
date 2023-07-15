import {UserProfile} from "@/types/profile";
import {StateCreator} from "zustand";

// Types
export type ListingSlice = {
  listingData: UserProfile["user"][] | [];
  setListingData: (data: UserProfile["user"][]) => void;
  heading: string;
  setHeading: (heading: string) => void;
};

// Initial state
const initialState = {
  listingData: [],
  heading: "",
};

export const listingSlice: StateCreator<
  ListingSlice,
  [],
  [],
  ListingSlice
> = set => ({
  ...initialState,
  // Actions
  // Set data
  setListingData: (listingData: UserProfile["user"][]) => {
    set(() => ({
      listingData: listingData,
    }));
  },
  setHeading: (heading: string) => {
    set(() => ({
      heading: heading,
    }));
  },
});
