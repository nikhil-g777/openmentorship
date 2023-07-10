import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const Goals = ({error}: Props) => {
  const {goals, setGoals, goalsList} = useRegisterStore();
  const {isEditable} = useProfileSettingsStore();

  // Handle change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Add to goals if checked
    if (e.target.checked) {
      setGoals({
        ...goals,
        [e.target.name]: true,
      });
    }
    // Delete from goals object if unchecked
    else {
      delete goals[e.target.name];
      setGoals(goals);
    }
  };

  return (
    <div className="form-control mt-2">
      {goalsList && goalsList.length
        ? goalsList.map(goal => (
            <label
              key={goal.id}
              className="label cursor-pointer justify-start gap-2"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-primary"
                name={goal.name}
                checked={goals[goal.name] || false}
                onChange={handleChange}
                disabled={!isEditable}
              />
              <span className="label-text text-base">{goal.title}</span>
            </label>
          ))
        : null}

      {/* Error */}
      {error.goals.length ? (
        <label className="label">
          <span className="label-text-alt text-error">{error.goals}</span>
        </label>
      ) : null}
    </div>
  );
};

export {Goals};
