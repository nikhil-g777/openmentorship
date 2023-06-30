import {useRegisterStore} from "@/zustand/store";

type Props = {
  error: {goals: string; frequency: string; preferences: string};
};

const Goals = ({error}: Props) => {
  const {goals, setGoals} = useRegisterStore();

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
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="careerAdvice"
          checked={goals.careerAdvice || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Career Advice</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="resumeReview"
          checked={goals.resumeReview || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Resume Review</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="mockInterview"
          checked={goals.mockInterview || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Mock Interview</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="projectReview"
          checked={goals.projectReview || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Project Review</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="collaboration"
          checked={goals.collaboration || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Collaboration on an Idea</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="businessAdvice"
          checked={goals.businessAdvice || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Business Advice</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="careerChangeAdvice"
          checked={goals.careerChangeAdvice || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Career Change Advice</span>
      </label>
      <label className="label cursor-pointer justify-start gap-2">
        <input
          type="checkbox"
          className="checkbox checkbox-primary"
          name="skillDevelopment"
          checked={goals.skillDevelopment || false}
          onChange={handleChange}
        />
        <span className="label-text text-base">Skill Development</span>
      </label>

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
