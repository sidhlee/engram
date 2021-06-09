import React from 'react';
import styled from 'styled-components';
import { mixins, mq } from '../styles';
import { FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import Logo from './Logo';
import junoLogo from '../images/juno-logo.png';
import { Link } from 'react-router-dom';

const StyledFooter = styled.footer`
  background: black;
  ${mixins.flexCenter}
  flex-direction: column;
  padding: 4rem 2rem;
  text-align: center;

  color: var(--text-muted-inverse);
  .footer-container {
    width: 62%;
    p {
      font-size: 1.25rem;
    }
    .credit {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      p {
        margin: 2rem auto;
        a {
          transition: color 200ms ease;
          &:hover {
            color: var(--text-inverse);
          }
        }
      }
      .logo__juno > a {
        img {
          width: 15rem;
          transition: filter 300ms ease;
        }
        &:hover > img {
          filter: brightness(1.3);
        }
      }
    }
    .social {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 3rem auto 4rem;
      .link-icons {
        display: flex;
        justify-content: space-between;
        width: 15rem;

        span {
          font-size: 2.5rem;
          svg {
            fill: var(--text-muted-inverse);
            transition: fill 300ms ease;
            &:hover {
              fill: var(--text-inverse);
            }
          }
        }
      }
      p {
        margin-top: 1em;
      }
    }
    .copy {
      font-size: 1rem;
    }
  }

  @media (min-width: ${mq.desktop}px) {
    .footer-container {
      position: relative;
      width: 90%;
      max-width: 1200px;
      // height: 80%;
      p {
        margin: 0;
      }
      .credit {
        width: 100%;
        max-width: 50rem;
        margin: 0 auto 3rem;
        flex-direction: row;
        .logo {
          flex-basis: 24%;
        }
        p {
          margin: 0 1em;
          text-align: center;
        }
      }

      .social {
        width: auto;
        .link-icons {
          width: 10rem;
          span {
            font-size: 2rem;
          }
        }
        p {
          margin-top: 0.5em;
          font-size: 0.75rem;
        }
      }
      .copy {
        position: relative;
        right: 1.5rem;
      }
    }
  }
`;

function Footer() {
  return (
    <StyledFooter className={`Footer`}>
      <div className="footer-container">
        <div className="credit">
          <Link to="/">
            <Logo />
          </Link>
          <p>
            is created by{' '}
            <a href="https://www.sidhlee.com/" target="_blank" rel="noreferrer">
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
              href="https://github.com/sidhlee/engram"
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
    </StyledFooter>
  );
}

export default Footer;
