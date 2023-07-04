import {useRegisterStore} from "@/zustand/store";

type Props = {
  headlineError: string;
  bioError: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const MainForm = ({headlineError, bioError, handleSubmit}: Props) => {
  const {firstName, lastName, email, headline, setHeadline, bio, setBio} =
    useRegisterStore();
  return (
    <form className="w-full mt-8" onSubmit={handleSubmit}>
      {/* First Name & Last Name */}
      <div className="w-full flex flex-col md:flex-row gap-2">
        <input
          type="text"
          placeholder="* First Name"
          className="input input-bordered w-full"
          disabled
          required
          value={firstName}
        />
        <input
          type="text"
          placeholder="* Last Name"
          className="input input-bordered w-full"
          disabled
          required
          value={lastName}
        />
      </div>
      {/* Email, Headline & Bio */}
      <div className="w-full flex flex-col gap-4 mt-4">
        <input
          type="text"
          placeholder="* Email"
          className="input input-bordered w-full"
          disabled
          required
          value={email}
        />
        <div className="w-full">
          <input
            id="headline"
            type="text"
            placeholder="* Headline"
            className={`input input-bordered w-full ${
              headlineError.length > 0 ? "border-error" : ""
            }`}
            value={headline}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setHeadline(e.target.value)
            }
          />
          {/* Headline Error */}
          {headlineError.length ? (
            <label className="label" htmlFor="headline">
              <span className="label-text-alt text-error">{headlineError}</span>
            </label>
          ) : null}
        </div>
        <div className="w-full">
          <textarea
            id="bio"
            placeholder="* Bio"
            className={`textarea textarea-bordered textarea-lg px-4 text-base w-full max-h-48 min-h-16 ${
              bioError.length ? "border-error" : ""
            }`}
            value={bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBio(e.target.value)
            }
          ></textarea>
          {/* Bio Error */}
          {bioError.length ? (
            <label className="label" htmlFor="headline">
              <span className="label-text-alt text-error">{bioError}</span>
            </label>
          ) : null}
        </div>
      </div>
    </form>
  );
};

export {MainForm};
