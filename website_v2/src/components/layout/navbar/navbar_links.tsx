import Link from "next/link";
import {usePathname} from "next/navigation";

const NavbarLinks = () => {
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
          <Link
            href="/explore?page=1&limit=10&areasOfInterest=&goals=&communicationFrequency=&communicationPreferences="
            className="btn btn-ghost normal-case text-base"
          >
            Discover
          </Link>
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
