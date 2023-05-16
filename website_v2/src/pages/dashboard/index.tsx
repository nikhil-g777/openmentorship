import CarouselWrapper from "./CarouselWrapper";
import FilterWrapper from "./FilterWrapper";
import Listing from "./Listing";

const Dashboard = () => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="w-full pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold px-4">
        Find your mentor
      </h1>
      <FilterWrapper />
      <CarouselWrapper />
      <Listing />
    </div>
  );
};

export default Dashboard;
