import {useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const CommunicationPreferences = ({error}: Props) => {
  const {communicationPreferences, setCommunicationPreferences} =
    useRegisterStore();
  const preferences = ["phone", "video", "chat", "message"];

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  Fix source has 5 elements but targets allows only 4
    if (communicationPreferences.length === 4 && e.target.checked) {
      return;
    }

    // Add or remove preference
    if (e.target.checked) {
      setCommunicationPreferences([...communicationPreferences, e.target.name]);
    } else {
      setCommunicationPreferences(
        communicationPreferences.filter(
          preference => preference !== e.target.name
        )
      );
    }
  };

  return (
    <div className="form-control mt-2">
      {preferences.map(preference => (
        <label
          key={preference}
          className="label cursor-pointer justify-start gap-2"
        >
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            name={preference}
            checked={communicationPreferences.includes(preference)}
            onChange={handleChange}
          />
          <span className="label-text text-base capitalize">{preference}</span>
        </label>
      ))}
      {/* Error */}
      {error.preferences.length ? (
        <label className="label">
          <span className="label-text-alt text-error">{error.preferences}</span>
        </label>
      ) : null}
    </div>
  );
};

export {CommunicationPreferences};
