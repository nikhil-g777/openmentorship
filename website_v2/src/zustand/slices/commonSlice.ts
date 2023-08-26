import {StateCreator} from "zustand";

export type CommonSlice = {
  successAlert: string;
  setSuccessAlert: (successAlert: string, time: number) => void;
  errorAlert: string;
  setErrorAlert: (errorAlert: string, time: number) => void;
  routeActionLoading: boolean;
  setRouteActionLoading: (routeActionLoading: boolean) => void;
  userConfirmation: {
    heading: string;
    subHeading: string;
    message: string;
  } | null;
  setUserConfirmation: (
    userConfirmation: CommonSlice["userConfirmation"] | null
  ) => void;
};

const initialState = {
  successAlert: "",
  errorAlert: "",
  routeActionLoading: false,
  userConfirmation: null,
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
  setRouteActionLoading: (routeActionLoading: boolean) => {
    set(() => ({
      routeActionLoading: routeActionLoading,
    }));
  },
  setUserConfirmation: (
    userConfirmation: CommonSlice["userConfirmation"] | null
  ) => {
    set(() => ({
      userConfirmation: userConfirmation,
    }));
  },
});
