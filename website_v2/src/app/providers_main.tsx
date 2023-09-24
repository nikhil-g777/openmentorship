"use client";

import React from "react";
import {SessionProvider} from "next-auth/react";
import {SuccessAlert} from "@/components/alerts/success_alert";
import {ErrorAlert} from "@/components/alerts/error_alert";
import {FeedbackButton} from "@/components/feedback/feedback_button";

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
      {/* Feedback Button */}
      <FeedbackButton />
    </SessionProvider>
  );
};

export {Providers};
