import Article from '../Article/Article';

import { useState } from 'react';
import ArticleForm from '../Article/ArticleForm';
import ConfirmationAlert from '../ConfirmationAlert';
import TopicHeader from './TopicHeader';

/**
 * @component
 * @param {{articles: import('../../context/articlesContext.js').StateArticle}}
 */
const Topic = ({ articles, deleteArticles, userId }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const topic = articles[0].topic;

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
      <TopicHeader
        topic={topic}
        handleAddArticleButtonClick={handleAddArticleButtonClick}
        handleDeleteTopicButtonClick={handleDeleteTopicButtonClick}
      />
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
        {articles.map((article) => {
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
              userId={userId}
            />
          ) : null;
        })}
      </ul>
    </section>
  );
};

export default Topic;