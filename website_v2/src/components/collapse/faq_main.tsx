type List = {
  id: string;
  heading: string;
  description: string;
}[];

type Props = {
  list: List;
};

const FAQ = ({list}: Props) => {
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
        ? list.map(single => (
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
              </div>
            </div>
          ))
        : null}

      {/* <Link
        href="#"
        className="block text-lg sm:text-xl font-semibold text-primary text-center mt-4 sm:mt-8 link link-hover"
      >
        See more
      </Link> */}
    </div>
  );
};

export {FAQ};
