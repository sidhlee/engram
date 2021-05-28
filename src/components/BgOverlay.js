const BgOverlay = ({ show, onClick }) => {
  return show ? (
    <div
      className="bg-overlay"
      role="button"
      aria-label="close menu modal"
      onClick={onClick}
    ></div>
  ) : null;
};

export default BgOverlay;
