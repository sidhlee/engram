import styled from 'styled-components';
import { FcMindMap } from 'react-icons/fc';
import { mq } from '../styles';

const StyledLogo = styled.span`
  display: inline-block;
  font-size: 2.75rem;
  font-weight: bold;
  color: var(--text-inverse);
  letter-spacing: -2px;
  opacity: 0.9;
  white-space: nowrap;
  .logo-img {
    position: relative;
    top: 0.1em;
  }
  @media (max-width: ${mq.mobile}px) {
    font-size: 2rem;
  }
`;

function Logo() {
  return (
    <StyledLogo className={`Logo`}>
      Engram{' '}
      <span className="logo-img">
        <FcMindMap aria-label="engram logo" />
      </span>
    </StyledLogo>
  );
}

export default Logo;
