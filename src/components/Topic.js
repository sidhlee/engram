import Article from './Article';
import orderBy from 'lodash.orderby';

/**
 * @component
 * @param {{articles: import('../hooks/useArticles.js').StateArticle}}
 */
const Topic = ({ articles }) => {
  const topic = articles[0].topic;
  // https://lodash.com/docs/4.17.15#orderBy
  const articlesSortedByDate = orderBy(articles, ['createdAt'], ['desc']);

  return (
    <section className="Topic">
      <h2 className="topic-name">{topic}</h2>
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
