"use client";

import {useState} from "react";

type List = {
  id: string;
  heading: string;
  description: string;
  list?: string[];
}[];

type Props = {
  list: List;
};

const FAQ = ({list}: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="w-full max-w-6xl mx-auto px-4 my-20">
      <h2
        className="text-center text-xl sm:text-heading sm:leading-normal font-bold"
        data-cy="faq-title-h2"
      >
        Got <span className="text-primary">Questions?</span>
      </h2>
      <h3 className="text-center mb-4 sm:mb-8" data-cy="faq-title-h3">
        Check out this section for answers to our FAQs
      </h3>
      {list && list.length
        ? list.slice(0, expanded ? list.length : 5).map(single => (
            <div
              className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box py-4"
              key={single.id}
            >
              <input type="checkbox" className="peer" />
              <div className="collapse-title bg-white text-black peer-checked:text-black text-lg sm:text-xl font-semibold">
                {single.heading}
              </div>
              <div className="collapse-content bg-white text-black peer-checked:text-black">
                <p>{single.description}</p>
                {/* List */}
                {single.list ? (
                  <ul className="w-full">
                    {single.list.map(item => (
                      <li key={item} className="list-disc mx-4">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          ))
        : null}

      {/* See More Button */}
      <div className="w-full flex items-center justify-center">
        <button
          className="block text-lg sm:text-xl font-semibold text-primary mt-4 link link-hover"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export {FAQ};
