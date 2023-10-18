import {ContactListLoader} from "@/loaders/chat/contact_list_loader";
import {MessagesScreenLoader} from "@/loaders/chat/messages_screen_loader";

const Loading = () => {
  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="w-full h-[65vh] mt-8 mb-20 border border-base-300 overflow-y-hidden">
        {/* Chat Container */}
        <div className="w-full h-full flex flex-row">
          <ContactListLoader />
          <MessagesScreenLoader />
        </div>
      </div>
    </div>
  );
};

export default Loading;
