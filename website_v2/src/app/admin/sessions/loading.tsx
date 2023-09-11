import {SessionsProfileCard} from "@/loaders/admin/sessions/sessions_profile_card";

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Tabs */}
      <div className="w-full max-w-[170px] h-10 lg:max-w-[214px] lg:h-14 mt-4 mx-auto animate-pulse">
        <div className="tabs tabs-boxed">
          <div className="tab sm:tab-md lg:tab-lg"></div>
          <div className="tab sm:tab-md lg:tab-lg"></div>
        </div>
      </div>
      {/* Container */}
      <div className="py-16">
        {/* Header */}
        <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "150px", height: "28px"}}
          ></div>
          <div
            className="bg-base-300 rounded-md animate-pulse"
            style={{width: "40%", height: "48px"}}
          ></div>
        </div>
        <div className="w-full py-20 mx-auto">
          <SessionsProfileCard />
          <SessionsProfileCard />
          <SessionsProfileCard />
          {/* Pagination */}
          <div className="w-48 h-12 bg-base-300 rounded-box animate-pulse mx-auto mt-16"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
