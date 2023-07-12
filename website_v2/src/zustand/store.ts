import {create} from "zustand";
import {commonSlice, CommonSlice} from "./slices/commonSlice";
import {registerSlice, RegisterSlice} from "./slices/registerSlice";
import {
  profileSettingsSlice,
  ProfileSettingsSlice,
} from "./slices/profileSettingsSlice";

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

export {useCommonStore, useRegisterStore, useProfileSettingsStore};
