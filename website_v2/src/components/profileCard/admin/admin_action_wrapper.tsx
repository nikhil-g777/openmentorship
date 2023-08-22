"use client";

import {UserProfile} from "@/types/profile";
import {useProfileStore} from "@/zustand/store";
import {useSession} from "next-auth/react";

type Props = {
  data: UserProfile["user"];
};

const AdminActionsWrapper = ({data}: Props) => {
  const token = useSession()?.data?.user?.token || "";
  const {setConfirmationText, setToken, setChatId} = useProfileStore();

  // Handle admin actions
  const handleAdminActions = (
    data: UserProfile["user"],
    buttonText: string
  ) => {
    // Set states
    setToken(token);
    setChatId(data._id);

    // Disable Account
    if (buttonText === "Disable Account") {
      setConfirmationText("Are you sure you want to disable this account?");
    }

    // Enable Account
    if (buttonText === "Enable Account") {
      setConfirmationText("Are you sure you want to enable this account?");
    }

    // Approve Account
    if (buttonText === "Approve Account") {
      setConfirmationText("Are you sure you want to approve this account?");
    }

    // Deny Account
    if (buttonText === "Deny Account") {
      setConfirmationText("Are you sure you want to deny this account?");
    }
  };

  return (
    <div className="w-full flex flex-col mt-4 gap-2">
      {/* Send Email */}
      <button
        className="w-full max-w-[200px] btn rounded-full btn-sm mt-4 mx-auto text-sm capitalize truncate btn-accent"
        onClick={() => handleAdminActions(data, "Send Email")}
      >
        Send Email
      </button>
      {/* Disable Account */}
      {data.registrationStatus === "complete" ? (
        <button
          className="w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate btn-outline btn-error"
          onClick={() => handleAdminActions(data, "Disable Account")}
        >
          Disable Account
        </button>
      ) : null}
      {/* Enable Account */}
      {data.registrationStatus === "disabled" ? (
        <button
          className="w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate btn-outline btn-accent"
          onClick={() => handleAdminActions(data, "Enable Account")}
        >
          Enable Account
        </button>
      ) : null}
      {/* Approve Button */}
      {data.registrationStatus === "pendingApproval" ||
      data.registrationStatus === "denied" ? (
        <button
          className="w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate btn-outline btn-accent"
          onClick={() => handleAdminActions(data, "Approve Account")}
        >
          Approve Account
        </button>
      ) : null}
      {/* Deny Button */}
      {data.registrationStatus === "pendingApproval" ? (
        <button
          className="w-full max-w-[200px] btn rounded-full btn-sm mt-2 mx-auto text-sm capitalize truncate btn-outline btn-error"
          onClick={() => handleAdminActions(data, "Deny Account")}
        >
          Deny Account
        </button>
      ) : null}
    </div>
  );
};

export {AdminActionsWrapper};
