import {ChatWrapper} from "@/components/chat/chat_wrapper";
import {StoreInitializer} from "@/components/chat/store_initializer";
import {NoResult} from "@/components/noResult/no_result";
import {getChatToken} from "@/endpoints/chat";
import {getUserMatches} from "@/endpoints/matches";
import {authOptions} from "@/helpers/auth_options";
import {checkNoResult} from "@/helpers/matches";
import {getServerSession} from "next-auth";

type Props = {
  searchParams: {
    id: string;
  };
};

const Page = async ({searchParams}: Props) => {
  const chatId = searchParams["id"] || "";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const data = await getUserMatches(token || "");
  const chatToken = await getChatToken(token || "");
  const userType = session?.user.user.userType || "";

  // No Result
  let isNoActiveResult = null;
  let isNoArchiveResult = null;
  if (data && data.success && data.matches) {
    isNoActiveResult = checkNoResult(userType, data?.matches["active"]);
    isNoArchiveResult = checkNoResult(userType, data?.matches["closed"]);
  }

  return (
    <div className="w-full h-[65vh] mb-20">
      <StoreInitializer
        token={token}
        data={data}
        userType={userType}
        chatId={chatId}
        twilioToken={chatToken?.twilioToken || ""}
      />

      {/* Chat Wrapper */}
      {isNoActiveResult && isNoArchiveResult ? null : <ChatWrapper />}

      {/* No Result */}
      {isNoActiveResult && isNoActiveResult ? (
        <NoResult message="Sorry! No Chat Found" />
      ) : null}
    </div>
  );
};

export default Page;