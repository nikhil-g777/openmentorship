// assets
import logo from "../assets/logo.png";

type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="flex justify-center items-center w-full mt-auto bg-[#F5F3F8] py-10 px-4 font-bold">
      <footer className="w-full max-w-6xl flex flex-wrap flex-col sm:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <div>
          <img
            src={logo}
            alt="Open Mentorship"
            className="btn btn-ghost btn-circle"
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
            <a href="mailto:hello@openmentorship.com" className="link">
              hello@openmentorship.com
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
