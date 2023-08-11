import Image from "next/image";

type Props = {
  guideline: {
    id: number;
    imageURL: string;
    text: string;
  };
};

const Guidelines = ({guideline}: Props) => {
  return (
    <li className="step step-primary !gap-2 sm:!gap-4 md:!gap-8">
      <div className="w-full card lg:card-side bg-base-100 border border-base-300 min-h-[120px] h-fit lg:mb-4">
        <Image
          src={guideline.imageURL}
          alt="steps"
          className="mx-auto p-4"
          width={100}
          height={100}
        />
        <div className="card-body">
          <p>{guideline.text}</p>
        </div>
      </div>
    </li>
  );
};

export {Guidelines};
