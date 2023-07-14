import {UserProfile} from "@/types/profile";
import {StateCreator} from "zustand";

// Types
export type CarouselSlice = {
  carouselData: UserProfile["user"][] | [];
  setCarouselData: (data: UserProfile["user"][]) => void;
};

// Initial state
const initialState = {
  carouselData: [],
};

export const carouselSlice: StateCreator<
  CarouselSlice,
  [],
  [],
  CarouselSlice
> = set => ({
  ...initialState,
  // Actions
  // Set data
  setCarouselData: (carouselData: UserProfile["user"][]) => {
    set(() => ({
      carouselData: carouselData,
    }));
  },
});
