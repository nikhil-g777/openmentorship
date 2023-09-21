"use client";

import {useChatStore} from "@/zustand/store";

const ChatMediaContentModal = () => {
  const {chatMediaContentModal, setChatMediaContentModal} = useChatStore();
  return (
    <div
      className={`modal modal-bottom sm:modal-middle ${
        chatMediaContentModal ? "modal-open" : ""
      }`}
    >
      <div className="modal-box">
        Placeholder
        <div className="modal-action">
          <button
            className="btn rounded-full btn-sm text-sm capitalize btn-outline hover:btn-primary"
            onClick={() => setChatMediaContentModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export {ChatMediaContentModal};
