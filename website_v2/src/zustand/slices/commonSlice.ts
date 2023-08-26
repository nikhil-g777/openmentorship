import {AuthenticationError} from "@/types/authentication";
import {StateCreator} from "zustand";

export type CommonSlice = {
  successAlert: string;
  setSuccessAlert: (successAlert: string, time: number) => void;
  errorAlert: string;
  setErrorAlert: (errorAlert: string, time: number) => void;
  authenticationError: AuthenticationError | null;
  setAuthenticationError: (
    authenticationError: AuthenticationError | null
  ) => void;
  routeActionLoading: boolean;
  setRouteActionLoading: (routeActionLoading: boolean) => void;
};

const initialState = {
  successAlert: "",
  errorAlert: "",
  authenticationError: null,
  routeActionLoading: false,
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
    // Timeout with cleanup
    const timer = setTimeout(() => {
      set(() => ({
        successAlert: "",
      }));
    }, time * 1000);
    return () => clearTimeout(timer);
  },
  //   Set the error alert
  setErrorAlert: (errorAlert: string, time) => {
    set(() => ({
      errorAlert: errorAlert,
    }));
    // Timeout with cleanup
    const timer = setTimeout(() => {
      set(() => ({
        errorAlert: "",
      }));
    }, time * 1000);
    return () => clearTimeout(timer);
  },
  setAuthenticationError: (authenticationError: AuthenticationError | null) => {
    set(() => ({
      authenticationError: authenticationError,
    }));
  },
  setRouteActionLoading: (routeActionLoading: boolean) => {
    set(() => ({
      routeActionLoading: routeActionLoading,
    }));
  },
});
