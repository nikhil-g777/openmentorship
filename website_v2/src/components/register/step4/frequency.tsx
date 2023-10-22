import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const CommunicationFrequency = ({error}: Props) => {
  const {
    communicationFrequency,
    setCommunicationFrequency,
    communicationFrequencyList,
  } = useRegisterStore();
  const {isEditable} = useProfileSettingsStore();
  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set communication frequency
    setCommunicationFrequency(e.target.value);
  };

  return (
    <div className="form-control mt-2">
      {communicationFrequencyList && communicationFrequencyList.length
        ? communicationFrequencyList.map(frequency => (
            <label
              key={frequency.id}
              className="label cursor-pointer justify-start gap-2"
            >
              <input
                type="radio"
                className="radio radio-primary"
                name="communicationInterval"
                value={frequency.value}
                onChange={handleChange}
                checked={
                  communicationFrequency.toLowerCase() ===
                  frequency.value.toLowerCase()
                }
                disabled={!isEditable}
                data-cy="register-step4-frequency-radio"
              />
              <span className="label-text text-base">{frequency.title}</span>
            </label>
          ))
        : null}
      {/* Error */}
      {error.frequency.length ? (
        <label className="label">
          <span
            className="label-text-alt text-error"
            data-cy="register-step4-frequency-error"
          >
            {error.frequency}
          </span>
        </label>
      ) : null}
    </div>
  );
};

export {CommunicationFrequency};
