type Props = {
  skills: string;
};
const Skills = ({ skills }: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Top Skills</h2>
      <p>{skills}</p>
      <br />
    </>
  );
};
export default Skills;
