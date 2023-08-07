import {useProfileSettingsStore} from "@/zustand/store";
import {SetStateAction} from "react";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: (value: SetStateAction<string>) => void;
};

const Form = ({handleSubmit, inputValue, setInputValue}: Props) => {
  const {isEditable} = useProfileSettingsStore();
  return (
    <form className="form-control" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          placeholder="Type here..."
          className="input input-bordered w-full"
          value={inputValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value)
          }
          disabled={!isEditable}
        />
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
