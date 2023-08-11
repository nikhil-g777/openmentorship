import {create} from "zustand";
import {commonSlice, CommonSlice} from "./slices/commonSlice";
import {registerSlice, RegisterSlice} from "./slices/registerSlice";
import {
  profileSettingsSlice,
  ProfileSettingsSlice,
} from "./slices/profileSettingsSlice";
import {carouselSlice, CarouselSlice} from "./slices/carouselSlice";
import {profileSlice, ProfileSlice} from "./slices/profileSlice";
import {listingSlice, ListingSlice} from "./slices/listingSlice";

// Common store
const useCommonStore = create<CommonSlice>()((...a) => ({
  ...commonSlice(...a),
}));

// Register store
const useRegisterStore = create<RegisterSlice>()((...a) => ({
  ...registerSlice(...a),
}));

// Profile store
const useProfileSettingsStore = create<ProfileSettingsSlice>()((...a) => ({
  ...profileSettingsSlice(...a),
}));

// Carousel store
const useCarouselStore = create<CarouselSlice>()((...a) => ({
  ...carouselSlice(...a),
}));

// Listing store
const useListingStore = create<ListingSlice>()((...a) => ({
  ...listingSlice(...a),
}));

// Profile store
const useProfileStore = create<ProfileSlice>()((...a) => ({
  ...profileSlice(...a),
}));

export {
  useCommonStore,
  useRegisterStore,
  useProfileSettingsStore,
  useCarouselStore,
  useProfileStore,
  useListingStore,
};
