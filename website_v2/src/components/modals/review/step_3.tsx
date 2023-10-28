import {useProfileStore} from "@/zustand/store";

type Props = {
  currentStep: number;
};

const Step3 = ({currentStep}: Props) => {
  const {setMentorReviewModal} = useProfileStore();
  return (
    <div
      className={`w-full min-h-[396px] flex flex-col ${
        currentStep === 3 ? "" : "hidden"
      }`}
    >
      {/* Heading */}
      <h3 className="text-lg font-semibold text-center my-8">
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
