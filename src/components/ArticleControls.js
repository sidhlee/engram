import { FaTrash as TrashIcon } from 'react-icons/fa';
import Stars from './Stars';

const ArticleControls = ({
  stars,
  read,
  note,
  updateStars,
  incrementRead,
  decrementRead,
  deleteArticle,
}) => {
  const handleNoteButtonClick = () => {
    console.log('note button click!');
  };

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
          onClick={handleNoteButtonClick}
        >
          Note
        </button>
        <button type="button" onClick={deleteArticle}>
          <span aria-label="delete article">
            <TrashIcon />
          </span>
        </button>
      </div>
      <textarea
        className="article-note-text"
        value={note}
        onChange={() => {}}
      />
    </div>
  );
};

export default ArticleControls;
