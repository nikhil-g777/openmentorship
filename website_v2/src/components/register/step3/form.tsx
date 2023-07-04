import {SetStateAction} from "react";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputValue: string;
  setInputValue: (value: SetStateAction<string>) => void;
};

const Form = ({handleSubmit, inputValue, setInputValue}: Props) => {
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
        />
        <button type="submit" className="btn btn-square px-8 btn-primary">
          Add
        </button>
      </div>
    </form>
  );
};

export {Form};
