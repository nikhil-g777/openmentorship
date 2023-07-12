import {Filter} from "./filter_main";
import {areaOfInterest, frequency, goals, preferences} from "./filters";

type Props = {
  title: string;
};

const FilterWrapper = ({title}: Props) => {
  return (
    <div className="w-full px-4">
      <h1 className="w-full max-w-6xl mx-auto pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold px-4">
        {title}
      </h1>
      <div className="w-full pt-8 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <Filter
          heading="Areas of Interest"
          filters={areaOfInterest}
          type="areasOfInterest"
        />
        <Filter heading="Goals" filters={goals} type="goals" />
        <Filter
          heading="Frequency"
          filters={frequency}
          type="communicationFrequency"
        />
        <Filter
          heading="Preferences"
          filters={preferences}
          type="communicationPreferences"
        />
      </div>
    </div>
  );
};

export {FilterWrapper};
