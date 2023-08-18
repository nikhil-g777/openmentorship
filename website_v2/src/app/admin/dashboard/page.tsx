import {Analytics} from "@/components/admin/dashboard/analytics/analytics_wrapper";
import {StoreInitializer} from "@/components/admin/dashboard/store_initializer";
import {Users} from "@/components/admin/dashboard/users/users_wrapper";
import {AdminTabs} from "@/components/tabs/admin_tabs";
import {getStats, getUsersList} from "@/endpoints/admin";
import {authOptions} from "@/helpers/auth_options";
import {getServerSession} from "next-auth";

type Props = {
  searchParams: {
    tab: string;
    userType: string;
    page: string;
  };
};

const Page = async ({searchParams}: Props) => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const userRole = session?.profile?.user?.role;

  // Statistics
  const statsData = await getStats(token || "");

  // Current Tab
  const currentTab = searchParams?.tab || "";

  // User Type
  const userType = searchParams?.userType || "mentee";

  // Page
  const page = searchParams?.page || 1;

  // Mentees and Mentors
  const data = await getUsersList(token || "", userType, Number(page));

  return (
    <div className="w-full">
      {/* Store Initializer */}
      <StoreInitializer
        statsData={statsData}
        userRole={userRole}
        userType={userType}
        data={data}
      />
      {/* Tabs */}
      <AdminTabs />
      {/* Analytics */}
      {currentTab === "analytics" || currentTab === "" ? <Analytics /> : null}
      {/* Users */}
      {currentTab === "users" ? <Users /> : null}
    </div>
  );
};

export default Page;
