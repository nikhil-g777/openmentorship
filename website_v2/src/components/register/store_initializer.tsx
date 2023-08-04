"use client";

import {useProfileSettingsStore} from "@/zustand/store";
import {useEffect} from "react";

const StoreInitializer = () => {
  const {setIsEditable} = useProfileSettingsStore();

  // Set isEditable to true on mount
  useEffect(() => {
    setIsEditable(true);
  }, [setIsEditable]);
  return null;
};

export {StoreInitializer};
