"use client";

import {useCommonStore} from "@/zustand/store";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";

const UserConfirmationModal = () => {
  const router = useRouter();
  const {userConfirmation, setUserConfirmation} = useCommonStore();
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
      <div className="modal-box relative">
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

        {/* Mentorship Program Action Button */}
        {userConfirmation?.heading === "Join Our Mentorship Program!" ? (
          <>
            <div className="modal-action justify-center mt-0 pb-2">
              <button
                className="btn btn-primary"
                onClick={() => router.push("/")}
              >
                Join Mentorship Program
              </button>
            </div>
            <Image
              src="/assets/icons/cancel.svg"
              alt="close"
              width={24}
              height={24}
              className="absolute top-2 right-2 cursor-pointer btn btn-sm btn-ghost btn-active btn-circle p-1"
              onClick={() => setUserConfirmation(null)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};

export {UserConfirmationModal};
