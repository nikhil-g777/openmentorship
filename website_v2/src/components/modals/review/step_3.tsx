import {useProfileStore} from "@/zustand/store";

const Step3 = () => {
  const {setMentorReviewModal} = useProfileStore();
  return (
    <div className="w-full min-h-[368px] flex flex-col">
      {/* Heading */}
      <h3 className="text-lg my-4 font-semibold">
        Thanks for providing feedback!
      </h3>

      <div className="modal-action mt-auto">
        <button
          className="btn rounded-full btn-primary btn-sm text-sm capitalize px-8"
          onClick={() => setMentorReviewModal(false)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export {Step3};
