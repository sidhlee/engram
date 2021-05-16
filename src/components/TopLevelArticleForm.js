import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ArticleForm from './ArticleForm';
import BgOverlay from './BgOverlay';

const TopLevelArticleForm = ({ addArticle }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <ArticleForm
        className={`TopLevelArticleForm ${show ? '' : 'hidden'}`}
        addArticle={addArticle}
      />
      <button
        className={`top-form-toggle shadow${show ? ' close-form' : ''}`}
        onClick={() => setShow((show) => !show)}
      >
        <FaPlus />
      </button>

      <BgOverlay show={show} />
    </>
  );
};

export default TopLevelArticleForm;
