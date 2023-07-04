import Image from "next/image";

const ImageWrapper = () => {
  return (
    <div className="w-full relative overflow-hidden hidden md:block">
      <Image
        src="/assets/images/registerBackground.png"
        fill={true}
        className="object-cover"
        alt="register-hero"
      />
    </div>
  );
};

export {ImageWrapper};
