import {create} from "zustand";
import {commonSlice, CommonSlice} from "./slices/commonSlice";
import {registerSlice, RegisterSlice} from "./slices/registerSlice";

// Common store
const useCommonStore = create<CommonSlice>()((...a) => ({
  ...commonSlice(...a),
}));

// Register store
const useRegisterStore = create<RegisterSlice>()((...a) => ({
  ...registerSlice(...a),
}));

export {useCommonStore, useRegisterStore};
