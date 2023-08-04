import {Analytics} from "@/components/admin/analytics";
import {AdminTabs} from "@/components/tabs/admin_tabs";

const Page = () => {
  return (
    <div className="w-full">
      {/* Tabs */}
      <AdminTabs />
      {/* Analytics */}
      <Analytics />
    </div>
  );
};

export default Page;
