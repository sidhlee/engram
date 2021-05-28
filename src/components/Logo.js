import { FcMindMap } from 'react-icons/fc';

function Logo() {
  return (
    <span className={`Logo`}>
      Engram{' '}
      <span className="logo-img">
        <FcMindMap aria-label="engram logo" />
      </span>
    </span>
  );
}

export default Logo;
