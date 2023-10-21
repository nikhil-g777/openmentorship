import {useProfileSettingsStore, useRegisterStore} from "@/zustand/store";

const StudentProfessional = () => {
  const {careerStatus, setCareerStatus} = useRegisterStore();
  const {isEditable} = useProfileSettingsStore();

  // Handle career status change
  const handleCareerStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCareerStatus(e.target.value);
  };
  return (
    <div className="w-full mt-8">
      <p
        className="text-base md:text-lg"
        data-cy="register-step1-career-status-heading"
      >
        Which of the following best describes you?
      </p>
      <select
        className="select select-bordered w-full mt-2"
        value={careerStatus}
        onChange={handleCareerStatusChange}
        disabled={!isEditable}
        data-cy="register-step1-career-status-select"
      >
        <option value="Student">Student</option>
        <option value="Professional">Professional</option>
      </select>
    </div>
  );
};

export {StudentProfessional};
