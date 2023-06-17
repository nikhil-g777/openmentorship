"use client";

import {signOut, useSession} from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

type Props = {};

const Navbar = (props: Props) => {
  const {status} = useSession();

  return (
    // Wrapper
    <div className="w-full shadow">
      {/* Container */}
      <footer className="navbar bg-base-100 max-w-6xl mx-auto sm:py-5">
        {status === "authenticated" ? (
          // Matches and Chat
          <div className="hidden sm:block">
            <Link
              href="/matches"
              className="btn btn-ghost normal-case text-base"
            >
              Matches
            </Link>
            <Link href="/chat" className="btn btn-ghost normal-case text-base">
              Chat
            </Link>
          </div>
        ) : null}
        {/* Logo */}
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
        {/* User Profile */}
        <div className="dropdown dropdown-end ml-auto">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
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
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
          >
            {status === "unauthenticated" ? (
              <>
                <li>
                  <Link href="/" data-cy="navbar-profile-login-link">
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/profile">Profile</Link>
                </li>
                <li>
                  <Link href="/matches">Matches</Link>
                </li>
                <li>
                  <Link href="/explore">Discover</Link>
                </li>
                <li>
                  <Link href="/chat">Chat</Link>
                </li>
                <li onClick={() => signOut()}>
                  <button>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </footer>
    </div>
  );
};

export {Navbar};
