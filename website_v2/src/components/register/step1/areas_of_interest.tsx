import {useRegisterStore} from "@/zustand/store";

// type
type Props = {
  error: string;
};

const AreasOfInterest = ({error}: Props) => {
  const {areasOfInterest, setAreasOfInterest} = useRegisterStore();

  // Handle checkbox change
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, checked} = e.target;
    if (name === "other" && checked) {
      setAreasOfInterest({
        software: false,
        design: false,
        other: true,
      });
    } else {
      setAreasOfInterest({...areasOfInterest, [name]: checked, other: false});
    }
  };
  return (
    <div className="w-full mt-8">
      <p className="text-base md:text-lg">What is your area of interest?</p>
      <div className="form-control mt-2">
        {/* Software */}
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="software"
            className="checkbox checkbox-primary"
            checked={areasOfInterest.software}
            onChange={handleCheckboxChange}
          />
          <span className="label-text text-base">Software</span>
        </label>
        {/* Design */}
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="design"
            className="checkbox checkbox-primary"
            checked={areasOfInterest.design}
            onChange={handleCheckboxChange}
          />
          <span className="label-text text-base">Design</span>
        </label>
        {/* Other */}
        <label className="label cursor-pointer justify-start gap-2">
          <input
            type="checkbox"
            name="other"
            className="checkbox checkbox-primary"
            checked={areasOfInterest.other}
            onChange={handleCheckboxChange}
          />
          <span className="label-text text-base">Other</span>
        </label>
        {/* Error */}
        {error.length ? (
          <label className="label">
            <span className="label-text-alt text-error">{error}</span>
          </label>
        ) : null}
      </div>
    </div>
  );
};

export {AreasOfInterest};
