"use client";

import {useProfileSettingsStore} from "@/zustand/store";
import Image from "next/image";
import {SaveDetails} from "../profileSettings/save_details";

type Props = {
  firstName: string;
  lastName: string;
  linkedinURI: string;
};
const Name = ({firstName, lastName, linkedinURI}: Props) => {
  const {isProfilePage} = useProfileSettingsStore();
  return (
    <div className="flex items-center justify-center sm:justify-start gap-4">
      <h2 className="text-xl md:text-2xl font-bold">
        {firstName} {lastName}
      </h2>
      <a
        href={linkedinURI}
        target="_blank"
        rel="noreferrer"
        className="hover:brightness-110"
      >
        <Image
          src="/assets/icons/linkedin.svg"
          alt="linkedin"
          width={24}
          height={24}
        />
      </a>

      {/* Edit/Save Button */}
      {isProfilePage ? <SaveDetails isTopPosition={true} /> : null}
    </div>
  );
};
export {Name};
