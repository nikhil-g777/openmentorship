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
  console.log(searchParams);
  const chatId = searchParams["id"] || "";
  const session = await getServerSession(authOptions);
  const token = session?.user?.token;
  const data = await getUserMatches(token || "");
  const chatToken = await getChatToken(token || "");
  const userType = session?.user.user.userType || "";
  const activeChats = data.matches["active"];

  // No Result
  const isResult = checkNoResult(userType || "", activeChats);

  return (
    <div className="w-full h-[65vh]">
      <StoreInitializer
        data={activeChats}
        userType={userType}
        chatId={chatId}
        twilioToken={chatToken?.twilioToken || ""}
      />

      {/* Chat Wrapper */}
      {isResult ? null : <ChatWrapper />}

      {/* No Result */}
      {isResult ? <NoResult message="Sorry! No Chat Found" /> : null}
    </div>
  );
};

export default Page;
