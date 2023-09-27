import {useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";

const NavbarLinks = () => {
  const userType = useSession()?.data?.user?.user?.userType || "";
  const pathname = usePathname();

  return (
    <div className="hidden sm:block">
      {pathname.startsWith("/admin") ? (
        <>
          <Link
            href="/admin/dashboard"
            className="btn btn-ghost normal-case text-base"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/sessions"
            className="btn btn-ghost normal-case text-base"
          >
            Sessions
          </Link>
        </>
      ) : (
        <>
          {userType === "mentee" ? (
            <Link
              href="/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
              className="btn btn-ghost normal-case text-base"
            >
              Discover
            </Link>
          ) : null}
          <Link href="/matches" className="btn btn-ghost normal-case text-base">
            Matches
          </Link>
          <Link href="/chat" className="btn btn-ghost normal-case text-base">
            Chat
          </Link>{" "}
        </>
      )}
    </div>
  );
};

export {NavbarLinks};
