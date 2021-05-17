import React from 'react';
import BgOverlay from './BgOverlay';

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
