"use client";

import Image from "next/image";
import {Filter} from "./filter_main";
import {areaOfInterest, frequency, goals, preferences} from "./filters";
import {FilterActions} from "./filter_actions";
import {useSearchParams} from "next/navigation";
import {performParamsToArray} from "@/helpers/filter";
import {useEffect} from "react";
import {useFilterStore} from "@/zustand/store";

type Props = {
  title: string;
};

const FilterWrapper = ({title}: Props) => {
  const params = useSearchParams();
  const {
    setStaticFilters,
    setAllFilters,
    setAreasOfInterest,
    setGoals,
    setCommunicationFrequency,
    setCommunicationPreferences,
  } = useFilterStore();

  useEffect(() => {
    const currentAreasOfInterest = performParamsToArray(
      "areasOfInterest",
      params
    );
    const currentGoals = performParamsToArray("goals", params);
    const currentFrequency = performParamsToArray(
      "communicationFrequency",
      params
    );
    const currentPreferences = performParamsToArray(
      "communicationPreferences",
      params
    );

    // Set the filters in the store
    setStaticFilters([
      ...currentAreasOfInterest,
      ...currentGoals,
      ...currentFrequency,
      ...currentPreferences,
    ]);
    setAllFilters([
      ...currentAreasOfInterest,
      ...currentGoals,
      ...currentFrequency,
      ...currentPreferences,
    ]);
    setAreasOfInterest(currentAreasOfInterest);
    setGoals(currentGoals);
    setCommunicationFrequency(currentFrequency);
    setCommunicationPreferences(currentPreferences);
  }, [
    params,
    setAllFilters,
    setAreasOfInterest,
    setCommunicationFrequency,
    setCommunicationPreferences,
    setGoals,
    setStaticFilters,
  ]);

  return (
    <div className="w-full px-4">
      <h1 className="w-full max-w-6xl mx-auto pt-16 text-xl text-center md:text-left sm:text-heading sm:leading-normal font-bold px-4">
        {title}
      </h1>
      {/* Container  */}
      <div className="w-full mt-8 max-w-6xl mx-auto collapse border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" className="peer" />
        <div className="w-full flex items-center pr-4 justify-between collapse-title bg-white text-black peer-checked:text-black font-semibold">
          <p className="w-full">Filters</p>
          <Image
            src="/assets/icons/filter.svg"
            alt="filter"
            width={24}
            height={24}
          />
        </div>
        <div className="collapse-content bg-white text-black peer-checked:text-black">
          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
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
          {/* Filter Actions */}
          <FilterActions />
        </div>
      </div>
    </div>
  );
};

export {FilterWrapper};
