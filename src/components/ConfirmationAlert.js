const ConfirmationAlert = ({
  cancelAction,
  confirmAction,
  message,
  confirmText,
}) => {
  return (
    <div className="ArticleDeleteConfirm">
      <p>{message}</p>
      <button className="button-sm button-success" onClick={cancelAction}>
        Cancel
      </button>
      <button className="button-sm button-danger" onClick={confirmAction}>
        {confirmText}
      </button>
    </div>
  );
};

export default ConfirmationAlert;
