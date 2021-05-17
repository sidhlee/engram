import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import {} from 'react-icons/fa';

const Navbar = ({ logOut, userName, userImageURL }) => {
  return (
    <div className="Navbar">
      <Link to="/">
        <Logo />
      </Link>

      <div className="navbar-col-right">
        <button className="signout button-md inverse" onClick={logOut}>
          Sign Out
        </button>
        <span className="user-name desktop-only">{userName}</span>
        <div className="user-img">
          <img src={userImageURL} alt={userName} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
