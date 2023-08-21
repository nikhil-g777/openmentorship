import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useTransition} from "react";

const Status = () => {
  const {setRouteActionLoading, routeActionLoading} = useCommonStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const registrationStatus = params.get("registrationStatus") || "";
  const userType = params.get("userType") || "mentee";
  const [isPending, startTransition] = useTransition();

  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const registrationStatus = event.target.value;
    const uri = `${pathname}?tab=users&userType=${userType}&page=1&registrationStatus=${registrationStatus}`;
    startTransition(() => {
      router.push(uri);
      router.refresh();
    });
  };

  useEffect(() => {
    setRouteActionLoading(isPending);
  }, [isPending, setRouteActionLoading]);

  return (
    <div className="form-control w-full sm:w-fit">
      <label className="label">
        <span className="label-text">Status</span>
      </label>
      <select
        className="select select-primary w-full rounded-full"
        defaultValue={registrationStatus ? registrationStatus : ""}
        onChange={handleChange}
        disabled={routeActionLoading}
      >
        <option value="">All</option>
        <option value="complete">Approved</option>
        <option value="incomplete">Pending</option>
        <option value="denied">Rejected</option>
        <option value="disabled">Disabled</option>
      </select>
    </div>
  );
};

export {Status};
