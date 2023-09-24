import {useProfileSettingsStore} from "@/zustand/store";
import {SetStateAction} from "react";

type Props = {
  type: string;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: (value: SetStateAction<string>) => void;
};

const Form = ({type, handleSubmit, inputValue, setInputValue}: Props) => {
  const {isEditable} = useProfileSettingsStore();
  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div className="input-group">
        <div className="w-full form-control">
          {/* Input */}
          <input
            type="text"
            placeholder="Type here..."
            className="input input-bordered w-full rounded-r-none"
            value={inputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputValue(e.target.value)
            }
            disabled={!isEditable}
          />
          {/* Example and Info */}
          <label className="w-full flex items-center gap-2 text-xs opacity-80 p-2">
            {type === "skills" ? "e.g: Web Development" : "e.g: Startups"}
            <div
              className="tooltip"
              data-tip={
                type === "skills"
                  ? "You can add upto 8 skills"
                  : "You can add upto 8 areas of interest"
              }
            >
              <button className="w-4 h-4 rounded-full border border-neutral font-semibold">
                i
              </button>
            </div>
          </label>
        </div>
        {/* Add */}
        <button
          type="submit"
          className="btn btn-square px-8 btn-primary"
          disabled={!isEditable}
        >
          Add
        </button>
      </div>
    </form>
  );
};

export {Form};
