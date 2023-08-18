import {useCommonStore} from "@/zustand/store";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useTransition} from "react";

const UserType = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const {setRouteActionLoading} = useCommonStore();

  // Handle change
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userType = event.target.value;
    const uri = `${pathname}/users?tab=users&userType=${userType}&page=1`;
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
        defaultValue="mentee"
        onChange={handleChange}
        disabled={isPending}
      >
        <option value="mentee">Mentee</option>
        <option value="mentor">Mentor</option>
      </select>
    </div>
  );
};

export {UserType};
