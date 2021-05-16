import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ArticleForm from './ArticleForm';
import BgOverlay from './BgOverlay';

const TopLevelArticleForm = ({ addArticle }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <ArticleForm
        className={`TopLevelArticleForm shadow ${show ? '' : 'hidden'}`}
        addArticle={addArticle}
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
