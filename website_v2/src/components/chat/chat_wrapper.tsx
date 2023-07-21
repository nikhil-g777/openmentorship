import {ChatContactList} from "./chat_contact_list";
import {ChatScreen} from "./chat_screen";

const ChatWrapper = () => {
  return (
    <div className="w-full h-full px-4">
      <div className="w-full h-full max-w-6xl mx-auto flex flex-row my-8 border border-base-300">
        <ChatContactList />
        <ChatScreen />
      </div>
    </div>
  );
};

export {ChatWrapper};
