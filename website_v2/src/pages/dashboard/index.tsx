import CarouselWrapper from "./CarouselWrapper";
import FilterWrapper from "./FilterWrapper";

const Dashboard = () => {
  return (
    <div className="w-full">
      <h1 className="w-full max-w-6xl mx-auto pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold px-4">
        Find your mentor
      </h1>
      <FilterWrapper />
      <CarouselWrapper />
    </div>
  );
};

export default Dashboard;
