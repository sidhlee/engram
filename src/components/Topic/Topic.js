import { useState } from 'react';
import styled from 'styled-components';
import Article from '../Article/Article';
import ArticleForm from '../Article/ArticleForm';
import ConfirmationAlert from '../ConfirmationAlert';
import TopicHeader from './TopicHeader';

const StyledTopic = styled.article`
  width: 100%;
  max-width: 520px;
  margin: 0 auto var(--gutter);
  padding: Min(Max(0.1rem, 1.8vw), 1rem);
  background: var(--cl-off-white);
  border-radius: var(--border-radius);
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .topic-name {
      margin-bottom: 0.5em;
    }
    .topic-controls {
      position: relative;
      bottom: 0.25rem;
      display: flex;
    }
  }

  .topic-form {
    margin: 1rem 0;
  }
`;

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
    <StyledTopic className="Topic">
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
    </StyledTopic>
  );
};

export default Topic;
