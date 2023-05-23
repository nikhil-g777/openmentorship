type Props = {
  description: string;
};
const Description = ({ description }: Props) => {
  return <p className="my-4">{description}</p>;
};
export default Description;
