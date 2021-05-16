import Article from './Article';
import orderBy from 'lodash.orderby';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useState } from 'react';
import ArticleForm from './ArticleForm';

/**
 * @component
 * @param {{articles: import('../hooks/useArticles.js').StateArticle}}
 */
const Topic = ({ articles }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const topic = articles[0].topic;
  // https://lodash.com/docs/4.17.15#orderBy
  const articlesSortedByDate = orderBy(articles, ['createdAt'], ['desc']);

  return (
    <section className="Topic">
      <header>
        <h2 className="topic-name">{topic}</h2>
        <div className="topic-controls">
          <button className="button-md article-remove">
            <span aria-label="Remove topic and all included articles">
              <FaMinus />
            </span>
          </button>
          <button
            className="button-md article-add"
            onClick={() => setShowAddForm((show) => !show)}
          >
            <span aria-label="add article">
              <FaPlus />
            </span>
          </button>
        </div>
      </header>
      {showAddForm && (
        <ArticleForm
          className="topic-form shadow"
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
