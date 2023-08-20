"use client";

import {UserProfile} from "@/types/profile";
import {useAdminDashboardStore} from "@/zustand/store";

type Props = {
  data: UserProfile["user"];
};

const AdminUserDetails = ({data}: Props) => {
  const {userInfo, setUserInfo} = useAdminDashboardStore();

  // Handle open
  const handleOpen = () => {
    setUserInfo(data);
  };

  // Handle close
  const handleClose = () => {
    setUserInfo(null);
  };

  return (
    <div className="w-full mt-4">
      {/* The button to open modal */}
      <div className="w-full flex items-center justify-between gap-2">
        <span className="truncate cursor-pointer" onClick={handleOpen}>
          User Information
        </span>
        <span
          className="lowercase font-semibold btn btn-xs btn-circle btn-outline"
          onClick={handleOpen}
        >
          i
        </span>
      </div>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div
        className={`modal modal-bottom sm:modal-middle ${
          userInfo ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">User Information:</h3>
          <div className="py-4">
            {/* User ID */}
            <div className="w-full flex items-center gap-2">
              <p className="font-semibold">User ID:</p>
              <p>{userInfo?._id}</p>
            </div>
            {/* Join Date */}
            <div className="w-full flex items-center gap-2 mt-2">
              <p className="font-semibold">Join Date:</p>
              <p>
                {userInfo
                  ? new Date(userInfo.createdAt).toLocaleDateString()
                  : ""}
              </p>
            </div>
            {/* User Type */}
            <div className="w-full flex items-center gap-2 mt-2">
              <p className="font-semibold">User Type:</p>
              <p className="capitalize">{userInfo?.userType}</p>
            </div>
            {/* Email */}
            <div className="w-full flex items-center gap-2 mt-2">
              <p className="font-semibold">Email:</p>
              <p>{userInfo?.email}</p>
            </div>
          </div>
          <div className="modal-action">
            <label className="btn" onClick={handleClose}>
              Close
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export {AdminUserDetails};
