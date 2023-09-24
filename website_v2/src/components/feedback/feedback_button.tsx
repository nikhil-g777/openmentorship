"use client";

import {getFeedbackUrl} from "@/helpers/feedback";
import {useSession} from "next-auth/react";

const FeedbackButton = () => {
  const session = useSession();
  const userId = session?.data?.profile?.user?._id;
  const email = session?.data?.profile?.user?.email;
  const formURL = userId && email ? getFeedbackUrl(userId, email) : null;

  // Return null if the session is unauthenticated or loading
  if (
    session.status === "unauthenticated" ||
    session.status === "loading" ||
    !formURL
  )
    return null;

  return (
    <a className="fixed z-50 bottom-4 right-4" href={formURL} target="_blank">
      <button className="btn btn-xs sm:btn-sm">Report Issue</button>
    </a>
  );
};

export {FeedbackButton};
