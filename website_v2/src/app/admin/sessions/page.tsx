import {SessionsWrapper} from "@/components/admin/sessions/sessions_wrapper";
import {StoreInitializer} from "@/components/admin/sessions/store_initializer";
import {Pagination} from "@/components/pagination/pagination_main";
import {SessionsTab} from "@/components/tabs/sessions_tabs";
import {getSessionList, searchSession} from "@/endpoints/admin";
import {authOptions} from "@/helpers/auth_options";
import {getServerSession} from "next-auth";

type Props = {
  searchParams: {
    tab: string;
    searchQuery: string;
    page: string;
  };
};

const Page = async ({searchParams}: Props) => {
  const session = await getServerSession(authOptions);
  const token = session?.user.token || "";
  // Search Query
  const searchQuery = searchParams?.searchQuery;
  // Page
  const page = searchParams.page || "1";

  // Session Data
  const sessionData = await getSessionList(token, page);

  // Search Data
  let searchData = null;
  if (searchQuery) {
    searchData = await searchSession(token, page, searchQuery);
  }

  return (
    <div className="w-full">
      {/* Store Initializer */}
      <StoreInitializer
        token={token}
        data={sessionData}
        searchData={searchData}
      />
      {/* Sessions Tab */}
      <SessionsTab />
      {/* Sessions */}
      <SessionsWrapper />
      {/* Pagination */}
      <Pagination data={searchData || sessionData} />
    </div>
  );
};

export default Page;
