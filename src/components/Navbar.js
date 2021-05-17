import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar = ({ logOut, userName, userImageURL }) => {
  return (
    <div className="Navbar">
      <Link to="/">
        <Logo />
      </Link>
      <div className="navbar-controls">
        <button className="signout button-md inverse" onClick={logOut}>
          Signout
        </button>

        <span className="user-name">{userName}</span>

        <div className="user-img">
          <img src={userImageURL} alt={userName} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
