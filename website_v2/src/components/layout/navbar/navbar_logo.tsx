import Image from "next/image";
import Link from "next/link";

const NavbarLogo = () => {
  return (
    <Link href="/" className="absolute left-2/4 -translate-x-2/4">
      <Image
        src="/assets/logo.png"
        alt="Open Mentorship"
        className="btn sm:btn-lg btn-ghost btn-circle"
        width={48}
        height={48}
        data-cy="navbar-logo-img"
      />
    </Link>
  );
};

export {NavbarLogo};
