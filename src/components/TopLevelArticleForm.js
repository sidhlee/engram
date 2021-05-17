import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ArticleForm from './ArticleForm';
import BgOverlay from './BgOverlay';

const TopLevelArticleForm = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ArticleForm
        className={`TopLevelArticleForm shadow ${show ? '' : 'hidden'}`}
        closeForm={() => setShow(false)}
      />
      <button
        className={`top-form-toggle shadow${show ? ' close-form' : ''}`}
        onClick={() => setShow((show) => !show)}
      >
        <FaPlus />
      </button>

      <BgOverlay show={show} onClick={() => setShow(false)} />
    </>
  );
};

export default TopLevelArticleForm;
