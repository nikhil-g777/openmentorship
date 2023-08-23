"use client";

import {signOut} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

const NavbarDropdown = () => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Close the dropdown when the route changes
  useEffect(() => {
    setIsDropdownOpen(false);
  }, [pathname]);

  return (
    <div className="dropdown dropdown-end ml-auto">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar"
        onClick={() => setIsDropdownOpen(true)}
      >
        <div className="w-10 rounded-full">
          <Image
            src="/assets/icons/user.svg"
            alt="user"
            width={40}
            height={40}
            data-cy="navbar-profile-img"
          />
        </div>
      </label>
      {isDropdownOpen ? (
        <ul
          tabIndex={0}
          className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
        >
          <li>
            <Link
              href="/profile"
              className={pathname === "/profile" ? "bg-primary text-white" : ""}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              href="/matches"
              className={pathname === "/matches" ? "bg-primary text-white" : ""}
            >
              Matches
            </Link>
          </li>
          <li>
            <Link
              href="/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
              className={pathname === "/explore" ? "bg-primary text-white" : ""}
            >
              Discover
            </Link>
          </li>
          <li>
            <Link
              href="/chat"
              className={pathname === "/chat" ? "bg-primary text-white" : ""}
            >
              Chat
            </Link>
          </li>
          <li onClick={() => signOut()}>
            <button>Logout</button>
          </li>
        </ul>
      ) : null}
    </div>
  );
};

export {NavbarDropdown};
