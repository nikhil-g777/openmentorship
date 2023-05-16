import { Dispatch, SetStateAction } from "react";
import { Mentors } from "../database/mentors";

type Props = {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  data: Mentors | null;
};
const Pagination = ({ currentPage, setCurrentPage, data }: Props) => {
  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <>
      {data && data.length ? (
        <div className="w-full btn-group mb-24 flex justify-center">
          <button
            className={`btn btn-outline border-base-300 ${
              currentPage === 0 ? "btn-disabled" : ""
            }`}
            onClick={handlePrevious}
          >
            «
          </button>
          <button className="btn btn-outline border-base-300 pointer-events-none">
            Page {currentPage + 1}
          </button>
          <button
            className={`btn btn-outline border-base-300 ${
              currentPage + 1 === Math.ceil(data.length / 5)
                ? "btn-disabled"
                : ""
            }`}
            onClick={handleNext}
          >
            »
          </button>
        </div>
      ) : null}
    </>
  );
};
export default Pagination;
