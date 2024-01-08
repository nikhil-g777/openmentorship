import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";
import {Goals} from "./goals";
import {CommunicationFrequency} from "./frequency";
import {CommunicationPreferences} from "./communication_preferences";
import {USER_TYPE} from "@/constants/common";

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
        <p
          className="text-base md:text-lg"
          data-cy="register-step4-goals-heading"
        >
          {userType === USER_TYPE.MENTEE
            ? "What do you need from your mentor? Select all that apply."
            : "What are you available to offer to your mentee? Select all that apply."}
        </p>
        <Goals error={error} />
      </div>
      {/* Communication Interval */}
      <div className="w-full mt-8">
        <p
          className="text-base md:text-lg"
          data-cy="register-step4-frequency-heading"
        >
          How often would you expect to communicate in your mentorship?
        </p>
        <CommunicationFrequency error={error} />
      </div>
      {/* Communication Medium */}
      <div className="w-full mt-8">
        <p
          className="text-base md:text-lg"
          data-cy="register-step4-preferences-heading"
        >
          What are your communication preferences? Select all that apply.
        </p>
        <CommunicationPreferences error={error} />
      </div>
    </div>
  );
};

export {Preferences};
