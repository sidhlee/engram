import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import ArticleForm from './ArticleForm';
import BgOverlay from './BgOverlay';

const TopLevelArticleForm = ({ addArticle }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <div className="TopLevelArticleForm">
        <ArticleForm className={show ? '' : 'hidden'} addArticle={addArticle} />
        <button
          className={`form-toggle shadow${show ? ' close-form' : ''}`}
          onClick={() => setShow((show) => !show)}
        >
          <FaPlus />
        </button>
      </div>
      <BgOverlay show={show} />
    </>
  );
};

export default TopLevelArticleForm;
