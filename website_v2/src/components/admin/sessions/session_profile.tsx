import {Designation} from "@/components/profileCard/designation";
import {Name} from "@/components/profileCard/name";
import {Profile} from "@/components/profileCard/profile";
import {UserProfile} from "@/types/profile";

type Props = {
  data: UserProfile["user"] | undefined;
};

const SessionProfile = ({data}: Props) => {
  const firstName = data?.firstName || "N/A";
  const lastName = data?.lastName || "";
  const linkedInURI = data?.linkedInId || "";
  const headline = data?.headline || "N/A";
  const profileImageUrls = data?.profileImageUrls || {
    original: "",
    thumbnail: "",
  };
  const userId = data?._id || "N/A";

  return (
    <div className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 mt-8 lg:gap-10">
      {/* Profile Image */}
      <Profile data={profileImageUrls} rootData={data} />
      <div className="w-full sm:max-w-md">
        {/* Name */}
        <Name
          firstName={firstName}
          lastName={lastName}
          linkedinURI={linkedInURI}
        />
        {/* Designation */}
        <Designation headline={headline} />

        {/* User Id */}
        <div className="flex gap-2 truncate">
          <b>User ID:</b>
          <span>{userId}</span>
        </div>
      </div>
    </div>
  );
};

export {SessionProfile};
