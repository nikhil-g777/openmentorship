import {ReadonlyURLSearchParams} from "next/navigation";

const performFilter = (
  e: React.ChangeEvent<HTMLInputElement>,
  type: string,
  areasOfInterest: string[],
  goals: string[],
  communicationFrequency: string[],
  communicationPreferences: string[]
) => {
  // Area of interest
  if (type === "areasOfInterest") {
    if (areasOfInterest.includes(e.target.name)) {
      const index = areasOfInterest.indexOf(e.target.name);
      areasOfInterest.splice(index, 1);
    } else {
      areasOfInterest.push(e.target.name);
    }
  }

  // Goals
  if (type === "goals") {
    if (goals.includes(e.target.name)) {
      const index = goals.indexOf(e.target.name);
      goals.splice(index, 1);
    } else {
      goals.push(e.target.name);
    }
  }

  // Communication Frequency
  if (type === "communicationFrequency") {
    if (communicationFrequency.includes(e.target.name)) {
      const index = communicationFrequency.indexOf(e.target.name);
      communicationFrequency.splice(index, 1);
    } else {
      communicationFrequency.push(e.target.name);
    }
  }

  // Communication Preferences
  if (type === "communicationPreferences") {
    if (communicationPreferences.includes(e.target.name)) {
      const index = communicationPreferences.indexOf(e.target.name);
      communicationPreferences.splice(index, 1);
    } else {
      communicationPreferences.push(e.target.name);
    }
  }
};

const performParamsToArray = (
  filter: string,
  params: ReadonlyURLSearchParams
): string[] => {
  const param = params.get(filter);
  if (param && param.length > 0) {
    return param?.split(",");
  } else {
    return [];
  }
};

const performUrlFormat = (
  areasOfInterest: string[],
  goals: string[],
  communicationFrequency: string[],
  communicationPreferences: string[]
) => {
  const aoiUrl = areasOfInterest.join(",");
  const goalsUrl = goals.join(",");
  const cfUrl = communicationFrequency.join(",");
  const cpUrl = communicationPreferences.join(",");

  return {aoiUrl, goalsUrl, cfUrl, cpUrl};
};

export {performFilter, performParamsToArray, performUrlFormat};
