import Masonry from 'react-masonry-css';
import Topic from './Topic';
import { useArticles } from '../context/articlesContext';

/**
 * @component
 * @param {{topicsOfArticles: import('../context/articlesContext.js').TopicsOfArticles}}
 * @returns
 */
const TopicList = () => {
  const { topicsOfArticles, deleteArticles } = useArticles();

  const topicComponents = Object.entries(topicsOfArticles).map(
    ([topicName, articlesByTopic]) => (
      <Topic
        key={topicName}
        articles={articlesByTopic}
        deleteArticles={deleteArticles}
      />
    )
  );

  // https://www.npmjs.com/package/react-masonry-css
  const breakpointColumnsObj = {
    default: 4,
    1600: 3,
    1150: 2,
    760: 1,
  };

  return (
    <Masonry
      className="Topics my-masonry-grid"
      breakpointCols={breakpointColumnsObj}
      columnClassName="my-masonry-grid_column"
    >
      {topicComponents}
    </Masonry>
  );
};

export default TopicList;
