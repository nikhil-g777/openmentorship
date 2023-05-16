import Carousel from "../../components/Carousel";
import Mentors from "../../components/mentorCard";

// mentors
import mentors from "../../database/mentors";

type Props = {};

const CarouselWrapper = (props: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <Carousel childrenLength={mentors.length}>
        {mentors.map((mentor) => (
          <Mentors data={mentor} key={mentor.id} />
        ))}
      </Carousel>
    </div>
  );
};

export default CarouselWrapper;
