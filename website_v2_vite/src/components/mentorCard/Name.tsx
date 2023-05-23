import linkedin from "../../assets/icons/linkedin.svg"

type Props = {
  name: string;
  linkedinURI: string;
};
const Name = ({ name, linkedinURI }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-lg font-bold">{name}</h2>
      <a
        href={linkedinURI}
        target="_blank"
        rel="noreferrer"
        className="hover:brightness-110"
      >
        <img src={linkedin} alt="linkedin" className="w-5 h-5" />
      </a>
    </div>
  );
};
export default Name;
