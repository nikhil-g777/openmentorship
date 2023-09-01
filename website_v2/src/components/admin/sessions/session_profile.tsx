import {Designation} from "@/components/profileCard/designation";
import {Name} from "@/components/profileCard/name";
import {Profile} from "@/components/profileCard/profile";
import {UserProfile} from "@/types/profile";

type Props = {
  data: UserProfile["user"];
};

const SessionProfile = ({data}: Props) => {
  return (
    <div className="w-full h-full items-stretch flex flex-col sm:flex-row gap-5 mt-8 lg:gap-10">
      {/* Profile Image */}
      <Profile data={data.profileImageUrls} rootData={data} />
      <div className="w-full sm:max-w-md">
        {/* Name */}
        <Name
          firstName={data.firstName}
          lastName={data.lastName}
          linkedinURI={data.linkedInId}
        />
        {/* Designation */}
        <Designation headline={data.headline} />

        {/* User Id */}
        <div className="flex gap-2 truncate">
          <b>User ID:</b>
          <span>{data._id}</span>
        </div>
      </div>
    </div>
  );
};

export {SessionProfile};
