"use client";

import {useCommonStore} from "@/zustand/store";

const AuthenticationLoader = () => {
  const {routeActionLoading} = useCommonStore();

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        routeActionLoading ? "modal-open" : ""
      }`}
      style={{backgroundColor: "#EEE"}}
    >
      <div className="modal-box py-16">
        <div className="w-full flex items-center justify-center pb-4">
          <button className="btn btn-square btn-primary loading"></button>
        </div>
        <h3 className="text-2xl font-bold text-center my-4">Signing in...</h3>
        <p className="text-lg text-center my-4">
          We are signing you into your account. Sit tight while we securely
          verify your credentials. Thank you for your patience and cooperation.
        </p>
      </div>
    </div>
  );
};

export {AuthenticationLoader};
