import {StateCreator} from "zustand";

export type CommonSlice = {
  successAlert: string;
  setSuccessAlert: (successAlert: string, time: number) => void;
  errorAlert: string;
  setErrorAlert: (errorAlert: string, time: number) => void;
};

const initialState = {
  successAlert: "",
  errorAlert: "",
};

export const commonSlice: StateCreator<
  CommonSlice,
  [],
  [],
  CommonSlice
> = set => ({
  ...initialState,
  //   Set the success alert
  setSuccessAlert: (successAlert: string, time) => {
    set(() => ({
      successAlert: successAlert,
    }));
    setTimeout(() => {
      set(() => ({
        successAlert: "",
      }));
    }, time * 1000);
  },
  //   Set the error alert
  setErrorAlert: (errorAlert: string, time) => {
    set(() => ({
      errorAlert: errorAlert,
    }));
    setTimeout(() => {
      set(() => ({
        errorAlert: "",
      }));
    }, time * 1000);
  },
});
