import Masonry from 'react-masonry-css';
import Topic from './Topic';

/**
 * @component
 * @param {{topicsOfArticles: import('../context/articlesContext.js').TopicsOfArticles}}
 * @returns
 */
const TopicList = ({ topicsOfArticles, deleteArticles, userId }) => {
  const sortedTopics = Object.keys(topicsOfArticles).sort();

  const topicComponents = sortedTopics.map((topicName) => {
    const articlesByTopic = topicsOfArticles[topicName];
    return (
      <Topic
        key={topicName}
        articles={articlesByTopic}
        deleteArticles={deleteArticles}
        userId={userId}
      />
    );
  });

  // https://www.npmjs.com/package/react-masonry-css
  const breakpointColumnsObj = {
    default: 5,
    2400: 4,
    1860: 3,
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
