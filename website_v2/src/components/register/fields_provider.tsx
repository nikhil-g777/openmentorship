"use client";

import Image from "next/image";
import {useState} from "react";

type Props = {
  heading: string;
  buttonText: string;
  inputOnePlaceholder: string;
  inputTwoPlaceholder: string;
};

const FieldsProvider = ({
  heading,
  buttonText,
  inputOnePlaceholder,
  inputTwoPlaceholder,
}: Props) => {
  const [inputFields, setInputFields] = useState<{[key: string]: string}[]>([]);

  const handleAddInput = () => {
    if (inputFields.length >= 3) return;
    setInputFields([...inputFields, {key: "", value: ""}]);
  };

  const handleRemoveInput = (index: number) => {
    setInputFields(inputFields.filter((field, i) => i !== index));
  };
  return (
    <div className="w-full mt-8">
      {/* Heading */}
      <h2 className="text-base md:text-lg font-medium">{heading}</h2>
      <div className="w-full">
        {inputFields && inputFields.length
          ? inputFields.map((field, index) => (
              <div
                key={field.key}
                className="w-full flex flex-col md:flex-row gap-2 my-2 last:-mb-4 md:last:mb-4"
              >
                <input
                  className="input input-bordered w-full"
                  key={index}
                  placeholder={inputOnePlaceholder}
                  value={field.key}
                  onChange={e => {
                    setInputFields(prevState => {
                      const newState = [...prevState];
                      newState[index].key = e.target.value;
                      return newState;
                    });
                  }}
                />
                <input
                  className="input input-bordered w-full"
                  key={index + 1}
                  placeholder={inputTwoPlaceholder}
                  value={field.value}
                  onChange={e => {
                    setInputFields(prevState => {
                      const newState = [...prevState];
                      newState[index].value = e.target.value;
                      return newState;
                    });
                  }}
                />
                {inputFields.length && (
                  <button
                    onClick={() => handleRemoveInput(index)}
                    className="btn btn-error mb-8 md:mb-0"
                  >
                    <Image
                      src="/assets/icons/cancel.svg"
                      width={24}
                      height={24}
                      alt="remove"
                    />
                  </button>
                )}
              </div>
            ))
          : null}
      </div>
      {inputFields.length < 3 ? (
        <button onClick={handleAddInput} className="btn btn-primary mt-2 mb-8">
          {buttonText}
        </button>
      ) : null}
    </div>
  );
};

export {FieldsProvider};
