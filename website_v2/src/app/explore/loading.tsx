import {FiltersLoader} from "@/loaders/filters_loader";
import {ProfileCardLoader} from "@/loaders/profile_card_loader";

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto py-16 px-4">
      {/* Heading */}
      <div className="w-full flex items-center justify-center md:justify-start">
        <div className="w-36 sm:w-96 h-8 sm:h-16 bg-base-300 animate-pulse"></div>
      </div>
      {/* Filters */}
      <FiltersLoader />
      {/* Recommendations Heading */}
      <div className="pt-[10%] sm:pt-[5%]">
        <div className="w-4/5 sm:w-96 h-10 bg-base-300 animate-pulse "></div>
      </div>
      {/* Recommendations Profile Card */}
      <ProfileCardLoader />
      {/* Listing */}
      <div className="pt-20">
        {/* Listing Heading */}
        <div className="w-20 sm:w-24 h-5 sm:h-6 bg-base-300 animate-pulse mb-2"></div>
        {/* Listing Profile Cards */}
        <ProfileCardLoader />
        <ProfileCardLoader />
        <ProfileCardLoader />
      </div>
      {/* Pagination */}
      <div className="w-48 h-12 bg-base-300 rounded-box animate-pulse mx-auto"></div>
    </div>
  );
};

export default Loading;
