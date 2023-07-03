import {StateCreator} from "zustand";

export type CommonSlice = {
  successAlert: string;
  setSuccessAlert: (successAlert: string) => void;
  errorAlert: string;
  setErrorAlert: (errorAlert: string) => void;
};

export const commonSlice: StateCreator<
  CommonSlice,
  [],
  [],
  CommonSlice
> = set => ({
  successAlert: "",
  //   Set the success alert and reset it after 3 seconds
  setSuccessAlert: (successAlert: string) => {
    set(() => ({
      successAlert: successAlert,
    }));
    setTimeout(() => {
      set(() => ({
        successAlert: "",
      }));
    }, 3000);
  },
  errorAlert: "",
  //   Set the error alert and reset it after 3 seconds
  setErrorAlert: (errorAlert: string) => {
    set(() => ({
      errorAlert: errorAlert,
    }));
    setTimeout(() => {
      set(() => ({
        errorAlert: "",
      }));
    }, 3000);
  },
});
