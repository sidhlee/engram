import orderBy from 'lodash.orderby';
import Masonry from 'react-masonry-css';
import Topic from './Topic';

/**
 * @component
 * @param {{topicsOfArticles: import('../../context/articlesContext.js').TopicsOfArticles}}
 * @returns
 */
const TopicList = ({ topicsOfArticles, deleteArticles, userId }) => {
  const sortedTopics = Object.keys(topicsOfArticles).sort();

  const topicComponents = sortedTopics.map((topicName) => {
    const articlesByTopic = topicsOfArticles[topicName];
    // https://lodash.com/docs/4.17.15#orderBy
    const topicArticlesSortedByDate = orderBy(
      articlesByTopic,
      ['createdAt'],
      ['desc']
    );
    return (
      <Topic
        key={topicName}
        articles={topicArticlesSortedByDate}
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
