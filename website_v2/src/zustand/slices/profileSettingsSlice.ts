import {StateCreator} from "zustand";

export type ProfileSettingsSlice = {
  profileImage: {
    [key: string]: string;
  };
  setProfileImage: (profileImage: {[key: string]: string}) => void;
  headlineError: string;
  setHeadlineError: (headlineError: string) => void;
  bioError: string;
  setBioError: (bioError: string) => void;
};

const initialState = {
  profileImage: {},
  headlineError: "",
  bioError: "",
};

export const profileSettingsSlice: StateCreator<
  ProfileSettingsSlice,
  [],
  [],
  ProfileSettingsSlice
> = set => ({
  ...initialState,
  //   Actions
  setProfileImage: (profileImage: {[key: string]: string}) => {
    set(() => ({
      profileImage: profileImage,
    }));
  },
  setHeadlineError: (headlineError: string) => {
    set(() => ({
      headlineError: headlineError,
    }));
  },
  setBioError: (bioError: string) => {
    set(() => ({
      bioError: bioError,
    }));
  },
});
