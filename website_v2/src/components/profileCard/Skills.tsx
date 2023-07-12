type Props = {
  skills: string[];
};
const Skills = ({skills}: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Top Skills</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
        {skills && skills.length
          ? skills.map(skill => (
              <span key={skill} className="kbd w-fit">
                {skill}
              </span>
            ))
          : null}
      </div>
    </>
  );
};
export {Skills};
