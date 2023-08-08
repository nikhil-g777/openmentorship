import {Analytics} from "@/components/admin/dashboard/analytics/analytics_wrapper";
import {StoreInitializer} from "@/components/admin/dashboard/store_initializer";
import {AdminTabs} from "@/components/tabs/admin_tabs";
import {getStats} from "@/endpoints/admin";
import {authOptions} from "@/helpers/auth_options";
import {getServerSession} from "next-auth";

type Props = {
  searchParams: {
    tab: string;
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
  return (
    <div className="w-full">
      {/* Store Initializer */}
      <StoreInitializer statsData={statsData} userRole={userRole} />
      {/* Tabs */}
      <AdminTabs />
      {/* Analytics */}
      {currentTab === "analytics" || currentTab === "" ? <Analytics /> : null}
    </div>
  );
};

export default Page;
