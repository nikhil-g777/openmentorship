import {useRegisterStore} from "@/zustand/store";

const StudentProfessional = () => {
  const {careerStatus, setCareerStatus} = useRegisterStore();

  // Handle career status change
  const handleCareerStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCareerStatus(e.target.value);
  };
  return (
    <div className="w-full mt-8">
      <p className="text-base md:text-lg">
        Which of the following best describes you?
      </p>
      <select
        className="select select-bordered w-full mt-2"
        value={careerStatus}
        onChange={handleCareerStatusChange}
      >
        <option value="Student">Student</option>
        <option value="Professional">Professional</option>
      </select>
    </div>
  );
};

export {StudentProfessional};
