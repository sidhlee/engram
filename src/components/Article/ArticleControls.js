import { FaTrash as TrashIcon } from 'react-icons/fa';
import Stars from './Stars';

const ArticleControls = ({
  stars,
  read,
  updateStars,
  incrementRead,
  decrementRead,
  toggleConfirmMenu,
  toggleNote,
}) => {
  return (
    <div className="article-controls">
      <div className="row">
        <Stars stars={stars} updateStars={updateStars} />
        <button
          className="article-btn article-read"
          type="button"
          onClick={incrementRead}
        >
          Read: {read}
        </button>
        <button
          className="article-btn article-unread"
          type="button"
          onClick={decrementRead}
        >
          Unread
        </button>
        <button
          className="article-btn article-note"
          type="button"
          onClick={toggleNote}
        >
          Note
        </button>
        <button
          type="button"
          className="delete-button"
          onClick={toggleConfirmMenu}
        >
          <span aria-label="delete article">
            <TrashIcon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ArticleControls;
