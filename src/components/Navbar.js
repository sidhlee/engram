import React from 'react';
import styled from 'styled-components';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import { mixins, mq } from '../styles';

const StyledNavbar = styled.div`
  padding: 1rem var(--px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .navbar-col-right {
    display: flex;
    gap: 1rem;
    @media (max-width: ${mq.mobile}px) {
      display: none;
    }
  }
  .nav-item {
    color: var(--text-inverse);
    &:hover,
    &:focus {
      color: var(--cl-accent);
    }
  }

  .user-name {
    padding: 0.25em 0.5em;
    font-size: 1.25rem;
    color: var(--text-inverse);
    ${mixins.flexCenter}
  }

  .user-img {
    display: flex;
    width: 3rem;
    height: 3rem;
  }
`;

const Navbar = ({ logOut, userName, userImageURL }) => {
  return (
    <StyledNavbar className="Navbar">
      <h1>
        <Link to="/">
          <Logo />
        </Link>
      </h1>

      <nav className="navbar-col-right">
        <Link className="button-md nav-item inverse" to="/about">
          What is Engram?
        </Link>
        <button className="signout nav-item button-md inverse" onClick={logOut}>
          Sign Out
        </button>
        <span className="user-name desktop-only">{userName}</span>
        <div className="user-img">
          <img src={userImageURL} alt={userName} />
        </div>
      </nav>
    </StyledNavbar>
  );
};

export default Navbar;
