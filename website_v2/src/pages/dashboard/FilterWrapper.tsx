import Filter from "../../components/Filter";
import {
  areaOfInterest,
  frequency,
  goals,
  preferences,
} from "../../database/filters";

type Props = {};

const FilterWrapper = (props: Props) => {
  return (
    <div className="w-full px-4">
      <div className="w-full pt-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Filter heading="Areas of Interest" filters={areaOfInterest} />
        <Filter heading="Goals" filters={goals} />
        <Filter heading="Frequency" filters={frequency} />
        <Filter heading="Preferences" filters={preferences} />
      </div>
    </div>
  );
};

export default FilterWrapper;
