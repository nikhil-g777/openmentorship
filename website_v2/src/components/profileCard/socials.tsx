import Image from "next/image";

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
              .filter(([key, value]) => key !== "" && value !== "")
              .map(([key, value]) => (
                <a
                  href={value}
                  target="_blank"
                  key={key}
                  className="btn btn-sm btn-circle btn-outline hover:btn-ghost p-1 border-base-300"
                >
                  <Image
                    src={`/assets/icons/${key.toLowerCase()}.svg`}
                    alt={key}
                    width={20}
                    height={20}
                  />
                </a>
              ))
          : null}
      </div>
    </>
  );
};

export {Socials};
