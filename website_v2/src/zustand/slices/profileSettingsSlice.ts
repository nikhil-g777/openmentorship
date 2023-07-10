import {StateCreator} from "zustand";

export type ProfileSettingsSlice = {
  isProfilePage: boolean;
  setisProfilePage: (isProfilePage: boolean) => void;
  profileImage: {
    [key: string]: string;
  };
  setProfileImage: (profileImage: {[key: string]: string}) => void;
  headlineError: string;
  setHeadlineError: (headlineError: string) => void;
  bioError: string;
  setBioError: (bioError: string) => void;
  areasOfInterestError: string;
  setAreasOfInterestError: (areasOfInterestError: string) => void;
};

const initialState = {
  isProfilePage: false,
  profileImage: {},
  headlineError: "",
  bioError: "",
  areasOfInterestError: "",
};

export const profileSettingsSlice: StateCreator<
  ProfileSettingsSlice,
  [],
  [],
  ProfileSettingsSlice
> = set => ({
  ...initialState,
  //   Actions
  setisProfilePage: (isProfilePage: boolean) => {
    set(() => ({
      isProfilePage: isProfilePage,
    }));
  },
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
  setAreasOfInterestError: (areasOfInterestError: string) => {
    set(() => ({
      areasOfInterestError: areasOfInterestError,
    }));
  },
});
