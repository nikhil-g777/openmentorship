"use client";

import {arrayEquals, performFilter} from "@/helpers/filter";
import {Filters} from "@/types/explore";
import {useCommonStore, useFilterStore} from "@/zustand/store";
import {useCallback, useEffect} from "react";

type Props = {
  heading: string;
  filters: Filters;
  type: string;
};

const Filter = ({heading, filters, type}: Props) => {
  const {routeActionLoading} = useCommonStore();
  const {
    staticFilters,
    allFilters,
    setAllFilters,
    areasOfInterest,
    goals,
    communicationFrequency,
    communicationPreferences,
    setIsFiltered,
  } = useFilterStore();

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // isChecked
    const isChecked = e.target.checked;
    // Update allFilters
    if (isChecked && !allFilters.includes(e.target.name)) {
      setAllFilters([...allFilters, e.target.name]);
    } else if (!isChecked && allFilters.includes(e.target.name)) {
      setAllFilters(allFilters.filter(item => item !== e.target.name));
    }

    // Filter on event change
    performFilter(
      e,
      type,
      areasOfInterest,
      goals,
      communicationFrequency,
      communicationPreferences
    );
  };

  // Perform array comparison
  const performArrayComparison = useCallback(() => {
    return arrayEquals(staticFilters, allFilters);
  }, [staticFilters, allFilters]);

  // Set isFiltered
  useEffect(() => {
    const isEqual = performArrayComparison();
    setIsFiltered(isEqual);
  }, [setIsFiltered, performArrayComparison]);

  return (
    <div className="h-fit collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
      <input type="checkbox" className="peer" />
      <div className="collapse-title bg-white text-black peer-checked:text-black">
        {heading}
      </div>
      <div className="collapse-content bg-white text-black peer-checked:text-black">
        {/* Filters */}
        {filters && filters.length
          ? filters.map(filter => (
              <div className="form-control" key={filter.key}>
                <label htmlFor={filter.id} className="label cursor-pointer">
                  <span className="label-text">{filter.label}</span>
                  <input
                    id={filter.id}
                    type="checkbox"
                    name={filter.text}
                    className="checkbox checkbox-primary"
                    onChange={handleFilter}
                    checked={allFilters.includes(filter.text)}
                    disabled={routeActionLoading}
                  />
                </label>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export {Filter};
