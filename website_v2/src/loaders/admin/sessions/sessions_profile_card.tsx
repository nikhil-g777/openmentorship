import {SingleSessionProfile} from "./single_session_profile";

const SessionsProfileCard = () => {
  return (
    <div className="w-full min-w-full pb-5">
      <div className="w-full mt-4 p-4 rounded-md border border-base-300">
        {/* Match Details */}
        <div className="w-full flex flex-wrap gap-4">
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "186px", height: "24px"}}
          ></div>
          <div
            className="bg-base-300 animate-pulse"
            style={{width: "318px", height: "24px"}}
          ></div>
        </div>
        {/* Mentee Card */}
        <SingleSessionProfile />
        {/* Mentor Card */}
        <SingleSessionProfile />
      </div>
    </div>
  );
};

export {SessionsProfileCard};
