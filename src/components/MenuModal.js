import styled from 'styled-components';
import { mixins } from '../styles';
import BgOverlay from './BgOverlay';
import { Link } from 'react-router-dom';

const StyledMenuModal = styled.div`
  position: fixed;
  z-index: var(--z-menu-modal);
  top: 0;
  right: 0;
  bottom: 0;
  width: 75%;
  max-width: 350px;
  background: var(--cl-primary-dark);

  transition: all 200ms ease-in-out;
  opacity: 0;
  transform: translate3d(100%, 0, 0);
  &.open {
    opacity: 1;
    transform: translate3d(0%, 0, 0);
  }

  ${mixins.flexCenter}
  text-align: center;

  .user-img {
    img {
      --size: Min(Max(80px, 20vw), 120px);
      width: var(--size);
      height: var(--size);
      border-radius: 50%;
    }
  }

  .user-name {
    margin: 1rem auto;
    font-size: 2rem;
    color: var(--text-inverse);
  }
  .about {
    font-size: 1.5rem;
  }

  .signout {
    margin-top: 4rem;
    font-size: 1rem;
    color: white;
    opacity: 0.8;
    font-size: 1.5rem;
    &:hover,
    &:active,
    &:focus {
      opacity: 1;
    }
  }
`;

function MenuModal({ userImgURL, userName, logOut, isMenuOpen, closeMenu }) {
  return (
    <>
      <StyledMenuModal className={`MenuModal${isMenuOpen ? ' open' : ''}`}>
        <div className="menu-inner">
          <div className="user-img">
            <img src={userImgURL} alt={userName} />
          </div>
          <div className="user-name">
            <span>{userName}</span>
          </div>
          <Link className="button-md inverse accent about" to="/about">
            What is Engram?
          </Link>
          <button className="signout" onClick={logOut}>
            Sign Out
          </button>
        </div>
      </StyledMenuModal>
      <BgOverlay onClick={closeMenu} show={isMenuOpen} />
    </>
  );
}

export default MenuModal;
