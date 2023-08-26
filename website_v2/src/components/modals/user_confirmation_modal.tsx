"use client";

import {useCommonStore} from "@/zustand/store";
import Image from "next/image";
import Link from "next/link";

const UserConfirmationModal = () => {
  const {userConfirmation} = useCommonStore();
  const imageUrl =
    userConfirmation?.heading === "Congratulations!"
      ? "/assets/images/userConfirm.svg"
      : "/assets/images/pending.png";

  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        userConfirmation ? "modal-open" : ""
      }`}
      style={{backgroundColor: "#EEE"}}
    >
      <div className="modal-box">
        <h3 className="text-2xl font-bold text-center py-4">
          {userConfirmation?.heading}
        </h3>
        {userConfirmation ? (
          <Image
            src={imageUrl}
            alt="user confirmation"
            width={150}
            height={150}
            className="mx-auto p-4"
          />
        ) : null}
        <h4 className="text-xl font-semibold text-center pt-4">
          {userConfirmation?.subHeading}
        </h4>
        <p className="text-center py-4">{userConfirmation?.message}</p>
        {userConfirmation?.heading === "Congratulations!" ? (
          <p className="text-center">
            Click here to sign in:{" "}
            <Link href="/" className="link">
              SignIn
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
};

export {UserConfirmationModal};
