type Props = {
  bio: string;
};
const Description = ({bio}: Props) => {
  return (
    <>
      <h2 className="font-semibold mt-2">About</h2>
      <p className="mb-2">{bio}</p>
    </>
  );
};
export default Description;
