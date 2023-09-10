const Loading = () => {
  return (
    <div
      className="modal modal-middle modal-open"
      style={{backgroundColor: "#EEE"}}
    >
      <div
        className="modal-box shadow-none flex items-center justify-center"
        style={{backgroundColor: "#EEE"}}
      >
        <button className="btn btn-square btn-primary loading"></button>
      </div>
    </div>
  );
};

export default Loading;
