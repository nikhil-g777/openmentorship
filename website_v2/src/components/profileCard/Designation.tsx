type Props = {
  headline: string;
};
const Designation = ({headline}: Props) => {
  return <h3 className="font-semibold my-4">{headline}</h3>;
};
export default Designation;
