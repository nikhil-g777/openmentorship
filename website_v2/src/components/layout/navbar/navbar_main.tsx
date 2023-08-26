"use client";

import {useSession} from "next-auth/react";
import {NavbarDropdown} from "./navbar_dropdown";
import {NavbarLogo} from "./navbar_logo";
import {NavbarLinks} from "./navbar_links";

const Navbar = () => {
  const {status} = useSession();

  return (
    // Wrapper
    <div className="w-full shadow">
      {/* Container */}
      <nav className="navbar bg-base-100 max-w-6xl mx-auto sm:py-5">
        {status === "authenticated" ? <NavbarLinks /> : null}
        {/* Logo */}
        <NavbarLogo />
        {/* User Profile */}
        {status === "authenticated" ? <NavbarDropdown /> : null}
      </nav>
    </div>
  );
};

export {Navbar};
