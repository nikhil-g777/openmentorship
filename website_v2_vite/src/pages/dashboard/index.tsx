import { useState } from "react";
import Pagination from "../../components/Pagination";
import CarouselWrapper from "./CarouselWrapper";
import FilterWrapper from "./FilterWrapper";
import Listing from "./Listing";

// database
import mentors from "../../database/mentors";

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="w-full pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold px-4">
        Find your mentor
      </h1>
      <FilterWrapper />
      <CarouselWrapper />
      <Listing
        mentors={mentors.slice(currentPage * 5, (currentPage + 1) * 5)}
      />
      <Pagination
        data={mentors}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Dashboard;
