import {UserProfile} from "@/types/profile";
import {StateCreator} from "zustand";

// Types
export type ListingSlice = {
  listingData: UserProfile["user"][] | [];
  setListingData: (data: UserProfile["user"][]) => void;
};

// Initial state
const initialState = {
  listingData: [],
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
});
