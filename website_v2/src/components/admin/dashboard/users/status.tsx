import {useCommonStore} from "@/zustand/store";

const Status = () => {
  const {routeActionLoading} = useCommonStore();

  return (
    <div className="form-control w-full sm:w-fit">
      <label className="label">
        <span className="label-text">Status</span>
      </label>
      <select
        className="select select-primary w-full rounded-full"
        defaultValue="all"
        disabled={routeActionLoading}
      >
        <option value="all">All</option>
        <option value="approved">Approved</option>
        <option value="pending">Pending</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
};

export {Status};
