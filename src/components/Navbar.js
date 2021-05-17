import React from 'react';

const Navbar = ({ logOut, userName, userImageURL }) => {
  return (
    <div className="Navbar">
      <h1 className="logo">Engram</h1>
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
