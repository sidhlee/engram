import React from 'react';

function MenuButton({ toggleMenu, isMenuOpen }) {
  return (
    <button
      className={`MenuButton${isMenuOpen ? ' close' : ''}`}
      aria-label="menu button"
      onClick={toggleMenu}
    >
      <span className="bar"></span>
    </button>
  );
}

export default MenuButton;
