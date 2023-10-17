"use client";

import {useSession} from "next-auth/react";
import {NavbarDropdown} from "./navbar_dropdown";
import {NavbarLogo} from "./navbar_logo";
import {NavbarLinks} from "./navbar_links";
import Link from "next/link";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const {status} = useSession();
  const pathname = usePathname();

  return (
    // Wrapper
    <div className="w-full shadow">
      {/* Container */}
      <nav className="navbar bg-base-100 max-w-6xl mx-auto sm:py-5">
        {/* NavbarLinks & loader */}
        {status === "loading" ? (
          <div className="hidden sm:block w-48 h-6 bg-base-300 animate-pulse"></div>
        ) : null}
        {status === "authenticated" ? <NavbarLinks /> : null}
        {/* Blogs Link */}
        {status === "unauthenticated" ? (
          <Link
            href="/blogs"
            className={`btn btn-ghost normal-case text-base ${
              pathname === "/blogs" ? "text-primary" : ""
            }`}
          >
            Blogs
          </Link>
        ) : null}
        {/* Logo */}
        <NavbarLogo />
        {/* User Profile & loader */}
        {status === "loading" ? (
          <div className="w-10 h-10 ml-auto rounded-full bg-base-300 animate-pulse"></div>
        ) : null}
        {status === "authenticated" ? <NavbarDropdown /> : null}
      </nav>
    </div>
  );
};

export {Navbar};
