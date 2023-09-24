"use client";

import {performAdminActions} from "@/helpers/admin/admin_actions";
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

    // Perform admin actions
    performAdminActions(buttonText, setConfirmationText);
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
