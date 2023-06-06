import Image from "next/image";
import Link from "next/link";

type Props = {
  data: {
    [key: string]: string;
  };
};

const Socials = ({data}: Props) => {
  return (
    <>
      <h2 className="font-semibold my-2">Social Media</h2>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-4">
        {data && Object.keys(data).length
          ? Object.entries(data)
              .filter(([key, value]) => value !== "")
              .map(([key, value]) => (
                <Link
                  href={value}
                  key={key}
                  className="btn btn-sm btn-circle btn-outline hover:btn-ghost p-1 border-base-300"
                >
                  <Image
                    src={`/assets/icons/${key.toLowerCase()}.svg`}
                    alt={key}
                    width={20}
                    height={20}
                  />
                </Link>
              ))
          : null}
      </div>
    </>
  );
};

export default Socials;
