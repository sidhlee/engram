import React from 'react';
import styled from 'styled-components';
import { mq } from '../styles';

const StyledMenuButton = styled.button`
  position: fixed;
  z-index: var(--z-menu-button);
  right: var(--px);
  top: var(--px);
  display: none;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  width: 40px;
  height: 35px;
  padding: 5px;
  margin-left: 1rem;

  span,
  &::before,
  &::after {
    content: '';
    display: block;
    height: 3px;
    background: var(--text-inverse);
    border-radius: 2px;
    box-shadow: 1px 1px 0 1.5px rgba(0, 0, 0, 1);
    transition: all 300ms ease;
  }

  &::before {
    width: 100%;
  }
  span {
    width: 75%;
  }
  &::after {
    width: 50%;
  }

  @media (max-width: ${mq.mobile}px) {
    display: flex;
  }

  &.close {
    &::before {
      transform: rotate(-45deg) translate(-8px, 7px);
    }
    span {
      transform: rotate(45deg);
      width: 100%;
    }
    &::after {
      opacity: 0;
    }
  }
`;

function MenuButton({ toggleMenu, isMenuOpen }) {
  return (
    <StyledMenuButton
      className={`MenuButton${isMenuOpen ? ' close' : ''}`}
      aria-label="menu button"
      onClick={toggleMenu}
    >
      <span className="bar"></span>
    </StyledMenuButton>
  );
}

export default MenuButton;
