import {ChatWrapper} from "@/components/chat/chat_wrapper";
import {StoreInitializer} from "@/components/chat/store_initializer";
import {ChatAttachmentModal} from "@/components/modals/attachment/chat_attachment_modal";
import {ChatMediaContentModal} from "@/components/modals/media/chat_media_content_modal";
import {MentorReviewModal} from "@/components/modals/review/mentor_review_modal";
import {NoResult} from "@/components/noResult/no_result";
import {TABS} from "@/constants/common";
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
    isNoActiveResult = checkNoResult(
      userType,
      data?.matches[TABS.MATCHES.ACTIVE]
    );
    isNoArchiveResult = checkNoResult(
      userType,
      data?.matches[TABS.MATCHES.CLOSED]
    );
  }

  return (
    <div className="w-full h-[65vh] mb-20">
      <StoreInitializer
        token={token}
        data={data}
        userType={userType}
        chatId={chatId}
        twilioToken={chatToken}
      />

      {/* Chat Wrapper */}
      {isNoActiveResult && isNoArchiveResult ? null : <ChatWrapper />}

      {/* No Result */}
      {isNoActiveResult && isNoActiveResult ? (
        <NoResult message="Sorry! No Chat Found" />
      ) : null}

      {/* Chat Attachment Modal */}
      <ChatAttachmentModal />

      {/* Chat Media Content Modal */}
      <ChatMediaContentModal />

      {/* Mentor Review Modal */}
      <MentorReviewModal />
    </div>
  );
};

export default Page;
