import {create} from "zustand";
import {registerSlice, RegisterSlice} from "./slices/registerSlice";

const useRegisterStore = create<RegisterSlice>()((...a) => ({
  ...registerSlice(...a),
}));

export {useRegisterStore};
