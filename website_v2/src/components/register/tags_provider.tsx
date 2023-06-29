"use client";

import Image from "next/image";
import {useState} from "react";

type Props = {
  heading: string;
};

const TagsProvider = ({heading}: Props) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Return if input value is empty
    if (inputValue.length === 0) return;

    // Return if input value already included
    for (const tag of tags) {
      if (tag.toLowerCase() === inputValue.toLowerCase()) {
        setInputValue("");
        return;
      }
    }

    // Set tags
    setTags(previous => [...previous, inputValue]);
    setInputValue("");
  };

  const handleDelete = (index: number) => {
    // Filter based on the index obtained
    const filtered = tags.filter((tag, tagIndex) => tagIndex !== index);
    setTags(filtered);
  };
  return (
    <div className="w-full my-8">
      <label className="block text-base md:text-xl mb-2">{heading}</label>
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
      {/* Tags */}
      <div className="w-full flex flex-wrap gap-2 items-center mt-3">
        {tags && tags.length
          ? tags.map((tag, index) => (
              <div
                className="badge badge-primary border-base-300 gap-2 py-4 pr-1 text-sm sm:text-base"
                key={tag}
              >
                {tag}
                <Image
                  src="/assets/icons/cancel.svg"
                  width={14}
                  height={14}
                  alt={tag}
                  className="cursor-pointer btn btn-xs btn-circle bg-white hover:bg-error border-none p-1"
                  onClick={() => handleDelete(index)}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export {TagsProvider};
