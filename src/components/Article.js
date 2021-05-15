import { FaTrash as TrashIcon } from 'react-icons/fa';
import Stars from './Stars';

const Article = ({
  title,
  href,
  stars,
  read,
  note,
  updateStars,
  updateNote,
  incrementRead,
  decrementRead,
  deleteArticle,
}) => {
  const handleNoteButtonClick = () => {
    console.log('note button click!');
  };
  return (
    <li className="Article">
      <h3 className="article-name">
        {href ? (
          <a href={href} target="_blank" rel="noreferrer">
            {title}
          </a>
        ) : (
          <span>{title}</span>
        )}
      </h3>
      <div className="article-controls">
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
        onChange={(e) => updateNote(e.target.value)}
      />
    </li>
  );
};

export default Article;
