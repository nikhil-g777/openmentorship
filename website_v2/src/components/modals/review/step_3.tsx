import {useProfileStore} from "@/zustand/store";
import {useRouter} from "next/navigation";

type Props = {
  currentStep: number;
};

const Step3 = ({currentStep}: Props) => {
  const router = useRouter();
  const {setMentorReviewModal} = useProfileStore();

  // Handle close
  const handleClose = () => {
    setMentorReviewModal(false);
    router.push("/chat");
    router.refresh();
  };
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
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export {Step3};
