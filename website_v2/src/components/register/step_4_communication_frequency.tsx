import {useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const CommunicationFrequency = ({error}: Props) => {
  const {communicationFrequency, setCommunicationFrequency} =
    useRegisterStore();
  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set communication frequency
    setCommunicationFrequency(e.target.value);
  };

  return (
    <div className="form-control mt-2">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="radio"
          className="radio radio-primary"
          name="communicationInterval"
          value="weekly"
          onChange={handleChange}
          checked={communicationFrequency === "weekly"}
        />
        <span className="label-text text-base">Weekly</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="radio"
          className="radio radio-primary"
          name="communicationInterval"
          value="biweekly"
          onChange={handleChange}
          checked={communicationFrequency === "biweekly"}
        />
        <span className="label-text text-base">Bi-Weekly</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="radio"
          className="radio radio-primary"
          name="communicationInterval"
          value="onceamonth"
          onChange={handleChange}
          checked={communicationFrequency === "onceamonth"}
        />
        <span className="label-text text-base">Once a Month</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="radio"
          className="radio radio-primary"
          name="communicationInterval"
          value="nopreference"
          onChange={handleChange}
          checked={communicationFrequency === "nopreference"}
        />
        <span className="label-text text-base">No Preference</span>
      </label>
      {/* Error */}
      {error.frequency.length ? (
        <label className="label">
          <span className="label-text-alt text-error">{error.frequency}</span>
        </label>
      ) : null}
    </div>
  );
};

export {CommunicationFrequency};
