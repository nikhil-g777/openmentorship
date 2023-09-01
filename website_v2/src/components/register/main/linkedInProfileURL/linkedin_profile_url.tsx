import {LinkedInProfileSteps} from "./linkedin_profile_steps";

const LinkedInProfileURL = () => {
  return (
    <div className="w-full flex flex-row items-center gap-4">
      <input
        type="text"
        placeholder="* LinkedIn Profile URL"
        className="input input-bordered w-full"
        disabled
        required
        // value={email}
      />
      <LinkedInProfileSteps />
    </div>
  );
};

export {LinkedInProfileURL};
