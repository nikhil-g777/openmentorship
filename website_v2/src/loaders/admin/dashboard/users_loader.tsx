import {ProfileCardLoader} from "@/loaders/profile_card_loader";

const UsersLoader = () => {
  return (
    <div className="w-full py-16">
      {/* Users Filter */}
      <div
        className="w-full border border-base-300 rounded-box animate-pulse"
        style={{width: "100%", height: "120px"}}
      ></div>
      {/* Users Container */}
      <div className="w-full pt-20">
        {/* Header Header */}
        <div
          className="animate-pulse mb-4"
          style={{width: "128px", height: "24px"}}
        ></div>
        {/* Users */}
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
      </div>
    </div>
  );
};

export {UsersLoader};
