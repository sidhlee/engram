/**
 * @typedef {Object} TopicProps
 * @property {import('../App').StateArticle[]} articles
 * */

import Article from './Article';

/**
 * @component
 * @param {TopicProps} param0
 */
const Topic = ({ articles }) => {
  const topic = articles[0].topic;
  return (
    <section className="Topic">
      <h2 className="topic-name">{topic}</h2>
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
            />
          ) : null;
        })}
      </ul>
    </section>
  );
};

export default Topic;
