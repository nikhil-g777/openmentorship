type Props = {
  provides: string[];
};
const Provides = ({ provides }: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Open to providing</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
        {provides.map((provide) => (
          <span key={provide} className="kbd w-fit">
            {provide}
          </span>
        ))}
      </div>
    </>
  );
};
export default Provides;
