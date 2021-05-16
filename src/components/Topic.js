import { useDispatch } from 'react-redux';
import {
  updateArticleStars,
  incrementArticleRead,
  decrementArticleRead,
  removeArticle,
  updateArticleNote,
} from '../app/articlesSlice';
import Article from './Article';

/**
 * @component
 * @param {TopicProps} param0
 */
const Topic = ({ articles }) => {
  const dispatch = useDispatch();

  const updateStars = (id, stars) => {
    dispatch(updateArticleStars({ id, stars }));
  };
  const incrementRead = (id) => {
    dispatch(incrementArticleRead(id));
  };
  const decrementRead = (id) => {
    dispatch(decrementArticleRead(id));
  };
  const deleteArticle = (id) => {
    dispatch(removeArticle(id));
  };
  const updateNote = (id, note) => {
    dispatch(updateArticleNote({ id, note }));
  };

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
              id={id}
              updateStars={(stars) => updateStars(id, stars)}
              incrementRead={() => incrementRead(id)}
              decrementRead={() => decrementRead(id)}
              deleteArticle={() => deleteArticle(id)}
              updateNote={() => updateNote(id, note)}
            />
          ) : null;
        })}
      </ul>
    </section>
  );
};

export default Topic;
