import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {Goals} from "./goals";
import {CommunicationFrequency} from "./frequency";
import {CommunicationPreferences} from "./communication_preferences";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const Preferences = ({error}: Props) => {
  const {userType} = useRegisterStore();
  const {isProfilePage} = useProfileSettingsStore();
  return (
    <div className="w-full">
      {/* Preferences */}
      <div className={isProfilePage ? "" : "w-full mt-8"}>
        <p className="text-base md:text-lg">
          {userType === "mentee"
            ? "What do you need from your mentor? Select all that apply."
            : "What are you available to offer to your mentee? Select all that apply."}
        </p>
        <Goals error={error} />
      </div>
      {/* Communication Interval */}
      <div className="w-full mt-8">
        <p className="text-base md:text-lg">
          How often would you expect to communicate in your mentorship?
        </p>
        <CommunicationFrequency error={error} />
      </div>
      {/* Communication Medium */}
      <div className="w-full mt-8">
        <p className="text-base md:text-lg">
          What are your communication preferences? Select all that apply.
        </p>
        <CommunicationPreferences error={error} />
      </div>
    </div>
  );
};

export {Preferences};
