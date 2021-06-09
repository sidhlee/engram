import styled from 'styled-components';
import { mixins } from '../styles';
import BgOverlay from './BgOverlay';

const StyledErrorModal = styled.aside`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--cl-white);
  padding: 2rem;
  ${mixins.flexCenter}
  flex-direction: column;
  z-index: var(--z-modal);
  p {
    margin-bottom: 1em;
  }
`;

const ErrorModal = ({ error, clearError }) => {
  return (
    <>
      <StyledErrorModal className="ErrorModal">
        <p>{error}</p>
        <button
          className="button-bg close-button"
          type="button"
          onClick={clearError}
        >
          OK
        </button>
      </StyledErrorModal>
      <BgOverlay show={error} onClick={clearError} />
    </>
  );
};

export default ErrorModal;
