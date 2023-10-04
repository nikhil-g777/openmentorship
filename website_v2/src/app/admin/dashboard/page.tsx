import {Analytics} from "@/components/admin/dashboard/analytics/analytics_wrapper";
import {StoreInitializer} from "@/components/admin/dashboard/store_initializer";
import {Users} from "@/components/admin/dashboard/users/users_wrapper";
import {ConfirmationModal} from "@/components/modals/confirmation/confirmation_modal";
import {AdminTabs} from "@/components/tabs/admin_tabs";
import {TABS} from "@/constants/common";
import {getStats, getUsersList, searchUsers} from "@/endpoints/admin";
import {authOptions} from "@/helpers/auth_options";
import {getServerSession} from "next-auth";

type Props = {
  searchParams: {
    tab: string;
    userType: string;
    page: string;
    searchQuery: string;
    registrationStatus: string;
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

  // Registration Status
  const registrationStatus = searchParams?.registrationStatus || "";

  // Search Query
  const searchQuery = searchParams?.searchQuery;

  // Mentees and Mentors
  const data = await getUsersList(
    token || "",
    userType,
    Number(page),
    registrationStatus
  );

  let searchData = null;
  if (searchQuery) {
    searchData = await searchUsers(token || "", searchQuery);
  }

  return (
    <div className="w-full">
      {/* Store Initializer */}
      <StoreInitializer
        token={token}
        statsData={statsData}
        userRole={userRole}
        userType={userType}
        data={data}
        searchData={searchData}
        searchQuery={searchQuery}
      />
      {/* Tabs */}
      <AdminTabs />
      {/* Analytics */}
      {currentTab === TABS.ADMIN.DASHBOARD.ANALYTICS || currentTab === "" ? (
        <Analytics />
      ) : null}
      {/* Users */}
      {currentTab === TABS.ADMIN.DASHBOARD.USERS ? <Users /> : null}
      {/* Confirmation Modal */}
      <ConfirmationModal />
    </div>
  );
};

export default Page;
