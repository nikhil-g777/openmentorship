import {UserProfile} from "@/types/profile";
import {StateCreator} from "zustand";

// Types
export type ProfileSlice = {
  // States
  data: UserProfile | null;
  token: string;
  chatId: string;
  firstName: string;
  collapsable: boolean;
  currentPage: string;
  currentTab: string;
  userType: string;
  menteeId: string;
  mentorId: string;
  isProfileModal: boolean;
  loading: boolean;
  confirmationText: string;
  // Actions
  setData: (data: UserProfile) => void;
  setToken: (token: string) => void;
  setChatId: (chatId: string) => void;
  setFirstName: (firstName: string) => void;
  setCollapsable: (collapsable: boolean) => void;
  setCurrentPage: (currentPage: string) => void;
  setCurrentTab: (currentTab: string) => void;
  setUserType: (userType: string) => void;
  setMenteeId: (menteeId: string) => void;
  setMentorId: (mentorId: string) => void;
  setIsProfileModal: (isProfileModal: boolean) => void;
  setLoading: (loading: boolean) => void;
  setConfirmationText: (confirmationText: string) => void;
};

// Initial state
const initialState = {
  data: null,
  token: "",
  chatId: "",
  firstName: "",
  collapsable: true,
  currentPage: "",
  currentTab: "",
  userType: "",
  isProfileModal: false,
  menteeId: "",
  mentorId: "",
  loading: false,
  confirmationText: "",
};

export const profileSlice: StateCreator<
  ProfileSlice,
  [],
  [],
  ProfileSlice
> = set => ({
  ...initialState,
  // Actions
  setData: (data: UserProfile) => {
    set(() => ({
      data: data,
    }));
  },
  setToken: (token: string) => {
    set(() => ({
      token: token,
    }));
  },
  setChatId: (chatId: string) => {
    set(() => ({
      chatId: chatId,
    }));
  },
  setFirstName: (firstName: string) => {
    set(() => ({
      firstName: firstName,
    }));
  },
  setCollapsable: (collapsable: boolean) => {
    set(() => ({
      collapsable: collapsable,
    }));
  },
  setCurrentPage: (currentPage: string) => {
    set(() => ({
      currentPage: currentPage,
    }));
  },
  setCurrentTab: (currentTab: string) => {
    set(() => ({
      currentTab: currentTab,
    }));
  },
  setUserType: (userType: string) => {
    set(() => ({
      userType: userType,
    }));
  },
  setIsProfileModal: (isProfileModal: boolean) => {
    set(() => ({
      isProfileModal: isProfileModal,
    }));
  },
  setMenteeId: (menteeId: string) => {
    set(() => ({
      menteeId: menteeId,
    }));
  },
  setMentorId: (mentorId: string) => {
    set(() => ({
      mentorId: mentorId,
    }));
  },
  setLoading: (loading: boolean) => {
    set(() => ({
      loading: loading,
    }));
  },
  setConfirmationText: (confirmationText: string) => {
    set(() => ({
      confirmationText: confirmationText,
    }));
  },
});
