type Filters = {
  label: string;
  id: string;
  key: string;
}[];

type Props = {
  heading: string;
  filters: Filters;
};

const Filter = ({ heading, filters }: Props) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="collapse collapse-plus border border-base-300 bg-base-100 rounded-box">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-white text-black peer-checked:text-black">
          {heading}
        </div>
        <div className="collapse-content bg-white text-black peer-checked:text-black">
          {/* Filters */}
          {filters && filters.length
            ? filters.map((filter) => (
                <div className="form-control" key={filter.key}>
                  <label htmlFor={filter.id} className="label cursor-pointer">
                    <span className="label-text">{filter.label}</span>
                    <input
                      id={filter.id}
                      type="checkbox"
                      className="checkbox"
                    />
                  </label>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Filter;
