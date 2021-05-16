const BgOverlay = ({ show, onClick }) => {
  return show ? <div className="bg-overlay" onClick={onClick}></div> : null;
};

export default BgOverlay;
