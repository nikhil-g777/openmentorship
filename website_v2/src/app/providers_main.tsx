"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";
import {SuccessAlert} from "@/components/alerts/successAlert";
import {ErrorAlert} from "@/components/alerts/errorAlert";

type Props = {
  children: React.ReactNode;
};

const Providers = ({children}: Props) => {
  return (
    <SessionProvider>
      {children}
      {/* Success Alert */}
      <SuccessAlert />
      {/* Error Alert */}
      <ErrorAlert />
    </SessionProvider>
  );
};

export {Providers};
