import { Mentors } from "../../database/mentors";
import Results from "../../components/mentorCard";

type Props = {
    mentors: Mentors
};

const Listing = ({mentors}: Props) => {
  return (
      <div className="pt-[10%] px-4">
        <h3 className="font-lg sm:text-xl font-semibold px-4">All Results</h3>
        {/* Results */}
        {mentors && mentors.length
          ? mentors.map((mentor) => <Results data={mentor} key={mentor.id} collapsable={true} />)
          : null}
      </div>
  );
};

export default Listing;
