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
import {chatSlice, ChatSlice} from "./slices/chatSlice";
import {dashboardSlice, DashboardSlice} from "./slices/admin/dashboardSlice";
import {filterSlice, FilterSlice} from "./slices/filterSlice";
import {sessionSlice, SessionSlice} from "./slices/admin/sessionsSlice";

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

// Chat store
const useChatStore = create<ChatSlice>()((...a) => ({
  ...chatSlice(...a),
}));

// Admin Dashboard store
const useAdminDashboardStore = create<DashboardSlice>()((...a) => ({
  ...dashboardSlice(...a),
}));

// Admin Session store
const useAdminSessionStore = create<SessionSlice>()((...a) => ({
  ...sessionSlice(...a),
}));

// Filter store
const useFilterStore = create<FilterSlice>()((...a) => ({
  ...filterSlice(...a),
}));

export {
  useCommonStore,
  useRegisterStore,
  useProfileSettingsStore,
  useCarouselStore,
  useProfileStore,
  useListingStore,
  useChatStore,
  useAdminDashboardStore,
  useAdminSessionStore,
  useFilterStore,
};
