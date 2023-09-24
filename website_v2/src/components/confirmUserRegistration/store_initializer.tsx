"use client";

import {handleUserConfirmation} from "@/helpers/register";
import {UserConfirmation} from "@/types/regsiter";
import {useCommonStore} from "@/zustand/store";
import {useEffect} from "react";

type Props = {
  data: UserConfirmation;
};

const StoreInitializer = ({data}: Props) => {
  const {setUserConfirmation} = useCommonStore();

  useEffect(() => {
    handleUserConfirmation(data, setUserConfirmation);
  }, [data, setUserConfirmation]);

  return null;
};

export {StoreInitializer};
