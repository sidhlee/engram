import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

const Navbar = ({ logOut, userName, userImageURL }) => {
  return (
    <div className="Navbar">
      <Link to="/">
        <Logo />
      </Link>

      <div className="navbar-col-right">
        <Link className="button-md inverse" to="/about">
          What is Engram?
        </Link>
        <button className="signout button-md inverse" onClick={logOut}>
          Sign Out
        </button>
        <span className="user-name desktop-only">{userName}</span>
        <div className="user-img">
          <img src={userImageURL} alt={userName} />
        </div>
        <div className="illustration">
          <img src="" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
