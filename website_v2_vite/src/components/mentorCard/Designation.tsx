type Props = {
  designation: string;
  experience: string;
};
const Designation = ({ designation, experience }: Props) => {
  return (
    <h3 className="font-semibold my-2">
      {designation}
      <br />
      {experience}
    </h3>
  );
};
export default Designation;
