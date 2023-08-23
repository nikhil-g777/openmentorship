import {ProfileCardLoader} from "@/loaders/profile_card_loader";

const UsersLoader = () => {
  return (
    <div className="w-full">
      {/* Users Filter */}
      <div
        className="w-full bg-base-300 border border-base-300 rounded-box animate-pulse"
        style={{width: "100%", height: "120px"}}
      ></div>
      {/* Users Container */}
      <div className="w-full pt-20">
        {/* Header Header */}
        <div
          className="bg-base-300 animate-pulse mb-4"
          style={{width: "128px", height: "24px"}}
        ></div>
        {/* Users */}
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
        {/* Pagination */}
        <div className="w-full btn-group mb-24 flex justify-center">
          <div
            className="bg-base-300 border-base-300 animate-pulse btn pointer-events-none"
            style={{width: "160px", height: "48px"}}
          ></div>
        </div>
      </div>
    </div>
  );
};

export {UsersLoader};
