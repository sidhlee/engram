import BgOverlay from './BgOverlay';

const ErrorModal = ({ error, clearError }) => {
  return (
    <>
      <div className="ErrorModal">
        <p>{error}</p>
        <button
          className="button-bg close-button"
          type="button"
          onClick={clearError}
        >
          OK
        </button>
      </div>
      <BgOverlay show={error} onClick={clearError} />
    </>
  );
};

export default ErrorModal;
