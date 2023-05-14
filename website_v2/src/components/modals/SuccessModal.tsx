type Props = {
  heading: string;
  message: string;
};

const SuccessModal = ({ heading, message }: Props) => {
  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my-modal-6" className="btn">
        open modal
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">{heading}</h3>
          <p className="py-4">{message}</p>
          <div className="modal-action">
            <label htmlFor="my-modal-6" className="btn">
              Okay!
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;
