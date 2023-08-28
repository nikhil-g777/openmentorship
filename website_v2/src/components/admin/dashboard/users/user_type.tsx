import {USER_TYPE} from "@/constants/admin/dashboard";
import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useTransition} from "react";

const UserType = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const registrationStatus = params.get("registrationStatus") || "";
  const userType = params.get("userType");
  const [isPending, startTransition] = useTransition();
  const {routeActionLoading, setRouteActionLoading} = useCommonStore();

  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userType = event.target.value;
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
        <span className="label-text">User Type</span>
      </label>
      <select
        className="select select-primary rounded-full"
        defaultValue={userType ? userType : "mentee"}
        onChange={handleChange}
        disabled={routeActionLoading}
      >
        <option value={USER_TYPE.MENTEE.value}>{USER_TYPE.MENTEE.label}</option>
        <option value={USER_TYPE.MENTOR.value}>{USER_TYPE.MENTOR.label}</option>
      </select>
    </div>
  );
};

export {UserType};
