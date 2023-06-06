"use client";

import {
  performFilter,
  performParamsToArray,
  performUrlFormat,
} from "@/helpers/filter";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

type Filters = {
  label: string;
  text: string;
  id: string;
  key: string;
}[];

type Props = {
  heading: string;
  filters: Filters;
  type: string;
};

const Filter = ({heading, filters, type}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const limit = params.get("limit");
  const areasOfInterest = performParamsToArray("areasOfInterest", params);
  const goals = performParamsToArray("goals", params);
  const communicationFrequency = performParamsToArray(
    "communicationFrequency",
    params
  );
  const communicationPreferences = performParamsToArray(
    "communicationPreferences",
    params
  );

  const listing = [
    ...areasOfInterest,
    ...goals,
    ...communicationFrequency,
    ...communicationPreferences,
  ];

  const handleFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Filter on event change
    performFilter(
      e,
      type,
      areasOfInterest,
      goals,
      communicationFrequency,
      communicationPreferences
    );

    // Format arrays to string
    const {aoiUrl, goalsUrl, cfUrl, cpUrl} = performUrlFormat(
      areasOfInterest,
      goals,
      communicationFrequency,
      communicationPreferences
    );

    // Push to the new URL
    const uri = `${pathname}?page=${1}&limit=${limit}&areasOfInterest=${aoiUrl}&goals=${goalsUrl}&communicationFrequency=${cfUrl}&communicationPreferences=${cpUrl}`;
    router.push(uri);
    router.refresh();
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
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
                      className="checkbox"
                      onChange={handleFilter}
                      checked={listing.includes(filter.text)}
                    />
                  </label>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Filter;
