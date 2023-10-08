import {STATUS} from "@/constants/admin/dashboard";
import {USER_TYPE} from "@/constants/common";
import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useTransition} from "react";

const Status = () => {
  const {setRouteActionLoading, routeActionLoading} = useCommonStore();
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const registrationStatus = params.get("registrationStatus") || "";
  const userType = params.get("userType") || USER_TYPE.MENTEE;
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
        <option value={STATUS.ALL.value}>{STATUS.ALL.label}</option>
        <option value={STATUS.COMPLETE.value}>{STATUS.COMPLETE.label}</option>
        <option value={STATUS.INCOMPLETE.value}>
          {STATUS.INCOMPLETE.label}
        </option>
        <option value={STATUS.DENIED.value}>{STATUS.DENIED.label}</option>
        <option value={STATUS.DISABLED.value}>{STATUS.DISABLED.label}</option>
        <option value={STATUS.PENDING_CONFIRMATION.value}>
          {STATUS.PENDING_CONFIRMATION.label}
        </option>
        <option value={STATUS.PENDING_APPROVAL.value}>
          {STATUS.PENDING_APPROVAL.label}
        </option>
      </select>
    </div>
  );
};

export {Status};
