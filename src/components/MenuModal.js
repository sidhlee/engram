import React from 'react';
import BgOverlay from './BgOverlay';
import { Link } from 'react-router-dom';

function MenuModal({ userImgURL, userName, logOut, isMenuOpen, closeMenu }) {
  return (
    <>
      <div className={`MenuModal${isMenuOpen ? ' open' : ''}`}>
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
      </div>
      <BgOverlay onClick={closeMenu} show={isMenuOpen} />
    </>
  );
}

export default MenuModal;
