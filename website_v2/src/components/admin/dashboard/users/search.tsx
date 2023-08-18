import {useCommonStore} from "@/zustand/store";

const Search = () => {
  const {routeActionLoading} = useCommonStore();

  return (
    <div className="w-full sm:w-fit form-control">
      <div className="input-group">
        <input
          type="text"
          placeholder="User ID or Name"
          className="w-full input input-bordered"
          disabled={routeActionLoading}
        />
        <button
          className="btn btn-square btn-primary"
          disabled={routeActionLoading}
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
      </div>
    </div>
  );
};

export {Search};
