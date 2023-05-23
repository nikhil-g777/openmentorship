type Props = {
  interest: string;
};
const Interest = ({ interest }: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Area of Interest</h2>
      <p>{interest}</p>
      <br />
    </>
  );
};
export default Interest;
