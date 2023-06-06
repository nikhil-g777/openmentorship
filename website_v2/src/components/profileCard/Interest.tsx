type Props = {
  interests: string[];
};
const Interest = ({interests}: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Area of Interest</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
        {interests && interests.length
          ? interests.map(interest => (
              <span key={interest} className="kbd w-fit">
                {interest}
              </span>
            ))
          : null}
      </div>
    </>
  );
};
export default Interest;
