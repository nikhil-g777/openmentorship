const MentorPreferences = () => {
  return (
    <div className="w-full">
      {/* Mentor Offering */}
      <div className="w-full mt-8">
        <p className="text-base md:text-lg">
          What are you available to offer to your mentee? Select all that apply.
        </p>
        <div className="form-control mt-2">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Career Advice</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Resume Review</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Mock Interview</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Project Review</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">
              Collaboration on an Idea
            </span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Business Advice</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Career Change Advice</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Skill Development</span>
          </label>
        </div>
      </div>
      {/* Communication Interval */}
      <div className="w-full mt-8">
        <p className="text-base md:text-lg">
          How often would you expect to communicate in your mentorship?
        </p>
        <div className="form-control mt-2">
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              className="radio radio-primary"
              name="communicationInterval"
            />
            <span className="label-text text-base">Weekly</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              className="radio radio-primary"
              name="communicationInterval"
            />
            <span className="label-text text-base">Bi-Weekly</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              className="radio radio-primary"
              name="communicationInterval"
            />
            <span className="label-text text-base">Once a Month</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input
              type="radio"
              className="radio radio-primary"
              name="communicationInterval"
            />
            <span className="label-text text-base">No Preference</span>
          </label>
        </div>
      </div>
      {/* Communication Medium */}
      <div className="w-full mt-8">
        <p className="text-base md:text-lg">
          What are your communication preferences? Select all that apply.
        </p>
        <div className="form-control mt-2">
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Phone Call</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Video Call</span>
          </label>
          <label className="label cursor-pointer justify-start gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" />
            <span className="label-text text-base">Chat or Messaging</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export {MentorPreferences};
