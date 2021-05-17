import React from 'react';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';
import junoLogo from '../images/juno-logo.png';

function Footer() {
  return (
    <footer className={`Footer`}>
      <div className="footer-container">
        <div className="credit">
          <Logo />
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
              aria-label="github"
            >
              <span>
                <FaGithub />
              </span>
            </a>
            <a
              href="https://twitter.com/sidhlee"
              rel="noreferrer"
              target="_blank"
              aria-label="twitter"
            >
              <span>
                <FaTwitter />
              </span>
            </a>
            <a
              href="https://www.instagram.com/sidhlee/"
              rel="noreferrer"
              target="_blank"
              aria-label="instagram"
            >
              <span>
                <FaInstagram />
              </span>
            </a>
          </div>
        </div>
      </div>
      <p>
        {' '}
        &copy; {new Date().getFullYear()} design &amp; code by{' '}
        <span className="nowrap">Sid Hayoun Lee</span>
      </p>
    </footer>
  );
}

export default Footer;
