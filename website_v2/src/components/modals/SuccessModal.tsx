type Props = {
  heading: string;
  message: string;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const SuccessModal = ({heading, message, isModal, setIsModal}: Props) => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="btn hidden">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div
        className={`modal modal-bottom sm:modal-middle ${
          isModal ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">{heading}</h3>
          <p className="py-4 break-all">{message}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => setIsModal(false)}>
              Okay!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
