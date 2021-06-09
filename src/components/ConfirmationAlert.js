import styled from 'styled-components';
import { mixins } from '../styles';

const StyledConfirmationAlert = styled.div`
  ${mixins.flexCenter}
  padding: 0.5rem;
  p {
    color: var(--cl-danger);
    margin-right: 1rem;
  }
`;

const ConfirmationAlert = ({
  cancelAction,
  confirmAction,
  message,
  confirmText,
}) => {
  return (
    <StyledConfirmationAlert className="ConfirmationAlert">
      <p>{message}</p>
      <button className="button-sm button-success" onClick={cancelAction}>
        Cancel
      </button>
      <button className="button-sm button-danger" onClick={confirmAction}>
        {confirmText}
      </button>
    </StyledConfirmationAlert>
  );
};

export default ConfirmationAlert;
