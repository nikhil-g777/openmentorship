import {ProfileCardLoader} from "@/loaders/profile_card_loader";

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Tabs */}
      <div className="w-full max-w-[245.31px] h-10 lg:max-w-[309.66px] lg:h-14 mt-4 mx-auto animate-pulse">
        <div className="tabs tabs-boxed">
          <div className="tab sm:tab-md lg:tab-lg"></div>
          <div className="tab sm:tab-md lg:tab-lg"></div>
        </div>
      </div>
      {/* Container */}
      <div className="py-20">
        {/* Listing Header */}
        <div
          className="bg-base-300 animate-pulse mb-4"
          style={{width: "200px", height: "24px"}}
        ></div>
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
      </div>
    </div>
  );
};

export default Loading;
