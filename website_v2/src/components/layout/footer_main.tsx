import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full mt-auto bg-[#F5F3F8] py-10 px-4 font-bold">
      <footer className="w-full max-w-6xl flex flex-wrap flex-col sm:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <div>
          <Image
            src="/assets/logo.png"
            alt="Open Mentorship"
            className="btn btn-ghost btn-circle"
            width={48}
            height={48}
            data-cy="footer-logo-img"
          />
        </div>
        {/* How it Works */}
        <div>
          <p>How it Works</p>
        </div>
        {/* Contact */}
        <div className="text-center">
          <p>
            You can reach us at :{" "}
            <a
              href="mailto:hello@openmentorship.com"
              className="link"
              data-cy="footer-contact-link"
            >
              hello@openmentorship.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export {Footer};
