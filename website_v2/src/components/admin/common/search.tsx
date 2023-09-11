"use client";

import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter} from "next/navigation";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useTransition,
} from "react";

const Search = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {routeActionLoading, setRouteActionLoading} = useCommonStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  // Handle Search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    // Prevent default
    e.preventDefault();

    // Check if search query is empty
    if (searchQuery === "") return;

    // URI
    const uri =
      pathname === "/admin/dashboard"
        ? `${pathname}?tab=users&searchQuery=${searchQuery}`
        : `${pathname}?tab=active&page=1&searchQuery=${searchQuery}`;

    // Perform search
    startTransition(() => {
      router.push(uri);
      router.refresh();
    });

    // Reset search query
    setSearchQuery("");
  };

  useEffect(() => {
    setRouteActionLoading(isPending);
  }, [isPending, setRouteActionLoading]);

  return (
    <div className="w-full sm:w-fit form-control">
      <form className="input-group" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="User ID or Name"
          className="w-full input input-bordered"
          disabled={routeActionLoading}
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <button
          className="btn btn-square btn-primary"
          disabled={routeActionLoading}
          type="submit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export {Search};
