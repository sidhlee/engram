import { FaPlus, FaMinus } from 'react-icons/fa';

function TopicHeader({
  topic,
  handleDeleteTopicButtonClick,
  handleAddArticleButtonClick,
}) {
  return (
    <header className={`TopicHeader`}>
      <h2 className="topic-name">{topic}</h2>
      <div className="topic-controls">
        <button
          className="button-md article-remove"
          onClick={handleDeleteTopicButtonClick}
        >
          <FaMinus aria-label="Remove topic and all included articles" />
        </button>
        <button
          className="button-md article-add"
          onClick={handleAddArticleButtonClick}
        >
          <FaPlus aria-label="add article" />
        </button>
      </div>
    </header>
  );
}

export default TopicHeader;
