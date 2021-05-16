import Article from './Article';
import orderBy from 'lodash.orderby';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import ArticleForm from './ArticleForm';
import ConfirmationAlert from './ConfirmationAlert';
import { deleteArticles } from '../hooks/useArticles';

/**
 * @component
 * @param {{articles: import('../hooks/useArticles.js').StateArticle}}
 */
const Topic = ({ articles }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const topic = articles[0].topic;
  // https://lodash.com/docs/4.17.15#orderBy
  const articlesSortedByDate = orderBy(articles, ['createdAt'], ['desc']);

  const removeTopicAndAllArticles = () => {
    deleteArticles(articles);
  };

  const handleDeleteTopicButtonClick = () => {
    setShowDeleteConfirm((show) => !show);
    setShowAddForm(false);
  };
  const handleAddArticleButtonClick = () => {
    setShowAddForm((show) => !show);
    setShowDeleteConfirm(false);
  };

  return (
    <section className="Topic">
      <header>
        <h2 className="topic-name">{topic}</h2>
        <div className="topic-controls">
          <button
            className="button-md article-remove"
            onClick={handleDeleteTopicButtonClick}
          >
            <span aria-label="Remove topic and all included articles">
              <FaMinus />
            </span>
          </button>
          <button
            className="button-md article-add"
            onClick={handleAddArticleButtonClick}
          >
            <span aria-label="add article">
              <FaPlus />
            </span>
          </button>
        </div>
      </header>
      {showDeleteConfirm && (
        <ConfirmationAlert
          message="Delete topic and all articles?"
          confirmText="Delete"
          cancelAction={() => setShowDeleteConfirm(false)}
          confirmAction={removeTopicAndAllArticles}
        />
      )}
      {showAddForm && (
        <ArticleForm
          className="topic-form shadow border"
          topic={topic}
          closeForm={() => setShowAddForm(false)}
        />
      )}
      <ul>
        {articlesSortedByDate.map((article) => {
          const { title, stars, read, note, href, deleted, id } = article;
          return !deleted ? (
            <Article
              key={id}
              title={title}
              stars={stars}
              read={read}
              note={note}
              href={href}
              id={id}
            />
          ) : null;
        })}
      </ul>
    </section>
  );
};

export default Topic;
