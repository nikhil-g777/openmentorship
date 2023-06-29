import {StateCreator} from "zustand";

export type RegisterSlice = {
  token: string;
  setToken: (type: string) => void;
  currentScreen: string;
  setCurrentScreen: (type: string) => void;
  firstName: string;
  setFirstName: (type: string) => void;
  lastName: string;
  setLastName: (type: string) => void;
  email: string;
  setEmail: (type: string) => void;
  headline: string;
  setHeadline: (type: string) => void;
  bio: string;
  setBio: (type: string) => void;
};

export const registerSlice: StateCreator<
  RegisterSlice,
  [],
  [],
  RegisterSlice
> = set => ({
  token: "",
  setToken: (token: string) =>
    set(() => ({
      token: token,
    })),
  currentScreen: "main",
  setCurrentScreen: (currentScreen: string) =>
    set(() => ({
      currentScreen: currentScreen,
    })),
  firstName: "",
  setFirstName: (firstName: string) =>
    set(() => ({
      firstName: firstName,
    })),
  lastName: "",
  setLastName: (lastName: string) =>
    set(() => ({
      lastName: lastName,
    })),
  email: "",
  setEmail: (email: string) =>
    set(() => ({
      email: email,
    })),
  headline: "",
  setHeadline: (headline: string) =>
    set(() => ({
      headline: headline,
    })),
  bio: "",
  setBio: (bio: string) =>
    set(() => ({
      bio: bio,
    })),
});
