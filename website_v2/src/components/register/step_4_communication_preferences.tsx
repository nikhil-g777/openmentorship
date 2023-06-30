import {useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const CommunicationPreferences = ({error}: Props) => {
  const {communicationPreferences, setCommunicationPreferences} =
    useRegisterStore();

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add to communicationPreferences if checked
    if (e.target.checked) {
      setCommunicationPreferences([...communicationPreferences, e.target.name]);
    }
    // Remove from communicationPreferences if unchecked
    else {
      setCommunicationPreferences(
        communicationPreferences.filter(
          preference => preference !== e.target.name
        )
      );
    }
  };

  return (
    <div className="form-control mt-2">
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="phone"
          checked={communicationPreferences.includes("phone")}
          onChange={handleChange}
        />
        <span className="label-text text-base">Phone Call</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="video"
          checked={communicationPreferences.includes("video")}
          onChange={handleChange}
        />
        <span className="label-text text-base">Video Call</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="chat"
          checked={communicationPreferences.includes("chat")}
          onChange={handleChange}
        />
        <span className="label-text text-base">Chat</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="message"
          checked={communicationPreferences.includes("message")}
          onChange={handleChange}
        />
        <span className="label-text text-base">Messaging</span>
      </label>
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
