import React from 'react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';
import junoLogo from '../images/juno-logo.png';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className={`Footer`}>
      <div className="footer-container">
        <div className="credit">
          <Link to="/">
            <Logo />
          </Link>
          <p>
            is created by{' '}
            <a href="mailto:sidhlee@gmail.com">
              <span className="my-name nowrap">Sid Hayoun Lee</span>
            </a>{' '}
            at
          </p>
          <div className="logo__juno">
            <a href="https://junocollege.com/" rel="noreferrer" target="_blank">
              <img src={junoLogo} alt="Juno College" />
            </a>
          </div>
        </div>
        <div className="social">
          <div className="link-icons">
            <a
              href="https://github.com/sidhlee"
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <FaGithub aria-label="github" />
              </span>
            </a>
            <a
              href="https://twitter.com/sidhlee"
              rel="noreferrer"
              target="_blank"
            >
              <span>
                <FaTwitter aria-label="twitter" />
              </span>
            </a>
            <a
              href="https://www.instagram.com/sidhlee/"
              rel="noreferrer"
              target="_blank"
              aria-label="instagram"
            >
              <span>
                <FaInstagram aria-label="instagram" />
              </span>
            </a>
          </div>
        </div>
        <p className="copy">
          {' '}
          &copy; {new Date().getFullYear()} design &amp; code by{' '}
          <span className="nowrap">Sid Hayoun Lee</span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
