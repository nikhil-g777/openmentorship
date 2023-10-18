import {USER_TYPE} from "@/constants/common";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavbarLinks = () => {
  const userType = useSession()?.data?.user?.user?.userType || "";
  const pathname = usePathname();

  return (
    <>
      <div className="hidden lg:block">
        {pathname.startsWith("/admin") ? (
          <>
            <Link
              href="/admin/dashboard"
              className={`btn btn-ghost normal-case text-base ${
                pathname === "/admin/dashboard" ? "text-primary" : ""
              }`}
            >
              Dashboard
            </Link>
            <Link
              href="/admin/sessions"
              className={`btn btn-ghost normal-case text-base ${
                pathname === "/admin/sessions" ? "text-primary" : ""
              }`}
            >
              Sessions
            </Link>
          </>
        ) : (
          <>
            {userType === USER_TYPE.MENTEE ? (
              <Link
                href="/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
                className={`btn btn-ghost normal-case text-base ${
                  pathname === "/explore" ? "text-primary" : ""
                }`}
              >
                Discover
              </Link>
            ) : null}
            <Link
              href="/matches"
              className={`btn btn-ghost normal-case text-base ${
                pathname === "/matches" ? "text-primary" : ""
              }`}
            >
              Matches
            </Link>
            <Link
              href="/chat"
              className={`btn btn-ghost normal-case text-base ${
                pathname === "/chat" ? "text-primary" : ""
              }`}
            >
              Chat
            </Link>
            <Link
              href="/blogs"
              className={`btn btn-ghost normal-case text-base ${
                pathname === "/blogs" ? "text-primary" : ""
              }`}
            >
              Blog
            </Link>
          </>
        )}
      </div>
      {/* Dropdown */}
      <div className="dropdown lg:hidden">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {pathname.startsWith("/admin") ? (
            <>
              <li>
                <Link
                  href="/admin/dashboard"
                  className={
                    pathname === "/admin/dashboard"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/sessions"
                  className={
                    pathname === "/admin/sessions"
                      ? "bg-primary text-white"
                      : ""
                  }
                >
                  Sessions
                </Link>
              </li>
            </>
          ) : (
            <>
              {userType === USER_TYPE.MENTEE ? (
                <li>
                  <Link
                    href="/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
                    className={
                      pathname === "/explore" ? "bg-primary text-white" : ""
                    }
                  >
                    Discover
                  </Link>
                </li>
              ) : null}
              <li>
                <Link
                  href="/matches"
                  className={
                    pathname === "/matches" ? "bg-primary text-white" : ""
                  }
                >
                  Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/chat"
                  className={
                    pathname === "/chat" ? "bg-primary text-white" : ""
                  }
                >
                  Chat
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className={
                    pathname === "/blogs" ? "bg-primary text-white" : ""
                  }
                >
                  Blog
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};

export {NavbarLinks};
