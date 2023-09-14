"use client";

import {useSession} from "next-auth/react";

const FeedbackButton = () => {
  const session = useSession();
  const userId = session?.data?.profile?.user?._id;
  const email = session?.data?.profile?.user?.email;
  const formURL = `https://docs.google.com/forms/d/e/1FAIpQLScelLxv-qdR7ZwkhjkluCootZkuk1HcRblcC92qM_Ab6Z_Pgg/viewform?usp=pp_url&entry.1801284720=${userId}&entry.688180669=${email}`;

  // Return null if the session is unauthenticated or loading
  if (
    session.status === "unauthenticated" ||
    session.status === "loading" ||
    !userId ||
    !email
  )
    return null;

  return (
    <a className="fixed z-50 bottom-4 right-4" href={formURL} target="_blank">
      <button className="btn btn-xs sm:btn-sm">Report Issue</button>
    </a>
  );
};

export {FeedbackButton};
