import React, { useState, useEffect } from "react";
import MatchProfile from "./MatchProfile";

//Dummy Data
const mentorData = {
  Name: "shawn",
  Job: "Consultant at XYZ",
  YearsExperience: 5,
  id: 1,
};

const mentorData2 = {
  Name: "alex",
  Job: "Consultant at XYZ",
  YearsExperience: 5,
  id: 2,
};

const mentorList = [mentorData, mentorData2];

const MatchCard = ({onClick}) => {
  function handleClick(id) {
    setSelectedProfileId(id)
    onClick();
  }

  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const selectedProfile = mentorList.find((x) => x.id === selectedProfileId);

  if (selectedProfile)
    return <MatchProfile selectedProfile={selectedProfile} />;

  return mentorList.map((x) => (
    <div profile={x} onClick={() => handleClick(x.id)}>
      {x.Name}
    </div>
  ));
};

export default MatchCard;
