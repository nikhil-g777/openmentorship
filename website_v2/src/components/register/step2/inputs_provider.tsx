import Image from "next/image";
import type {WorkExperience, Education, CurrentType} from "@/types/regsiter";
import {useProfileSettingsStore} from "@/zustand/store";

type Props = {
  type: string;
  inputFields: WorkExperience[] | Education[] | [];
  handleChangeInput: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleRemoveInput: (index: number) => void;
  inputError: {experience: string; education: string};
  handleAddInput: () => void;
};

const InputProvider = ({
  type,
  inputFields,
  handleChangeInput,
  handleRemoveInput,
  inputError,
  handleAddInput,
}: Props) => {
  const {isProfilePage, isEditable} = useProfileSettingsStore();
  return (
    <>
      {/* Heading */}
      <h2
        className={isProfilePage ? "text-lg" : "text-lg md:text-xl font-medium"}
        data-cy="register-step2-sub-heading"
      >
        {type === "experiences" ? "Work Experience" : "Education"}
      </h2>
      <div className="w-full">
        {inputFields && inputFields.length
          ? inputFields.map((field: CurrentType, index: number) => (
              <div
                key={field.key || field._id}
                className="w-full flex flex-col md:flex-row gap-2 my-2 last:-mb-4 md:last:mb-4"
              >
                <input
                  className="input input-bordered w-full"
                  placeholder={
                    type === "experiences" ? "Organization" : "School"
                  }
                  name={type === "experiences" ? "organization" : "school"}
                  value={
                    type === "experiences" ? field.organization : field.school
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeInput(index, e)
                  }
                  disabled={!isEditable}
                  data-cy="register-step2-first-input"
                />
                <input
                  className="input input-bordered w-full"
                  placeholder={type === "experiences" ? "Title" : "Degree"}
                  name={type === "experiences" ? "title" : "degree"}
                  value={type === "experiences" ? field.title : field.degree}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChangeInput(index, e)
                  }
                  disabled={!isEditable}
                  data-cy="register-step2-second-input"
                />
                {inputFields.length ? (
                  <button
                    onClick={() => handleRemoveInput(index)}
                    className="place-self-end btn btn-error mb-8 md:mb-0"
                    disabled={!isEditable}
                    data-cy="register-step2-remove-button"
                  >
                    <Image
                      src="/assets/icons/trash.svg"
                      width={24}
                      height={24}
                      alt="remove"
                    />
                  </button>
                ) : null}
              </div>
            ))
          : null}
        {/* Input Error */}
        {type === "experiences" && inputError.experience.length ? (
          <label className="label">
            <span
              className="label-text-alt text-error"
              data-cy="register-step2-experience-error"
            >
              {inputError.experience}
            </span>
          </label>
        ) : null}
        {type === "education" && inputError.education.length ? (
          <label className="label">
            <span
              className="label-text-alt text-error"
              data-cy="register-step2-education-error"
            >
              {inputError.education}
            </span>
          </label>
        ) : null}
      </div>
      {/* Add Button */}
      {inputFields.length < 3 ? (
        <button
          onClick={handleAddInput}
          className="btn btn-primary mt-2 mb-8"
          disabled={!isEditable}
          data-cy="register-step2-add-button"
        >
          {type === "experiences" ? "Add Experience" : "Add Education"}
        </button>
      ) : null}
    </>
  );
};

export {InputProvider};
