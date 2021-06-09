import orderBy from 'lodash.orderby';
import Masonry from 'react-masonry-css';
import styled from 'styled-components';
import Topic from './Topic';

const StyledTopicList = styled(Masonry)`
  opacity: 0;
  animation: fade-in 1.2s forwards ease-in-out;
`;

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
    <StyledTopicList
      className="TopicList my-masonry-grid"
      breakpointCols={breakpointColumnsObj}
      columnClassName="my-masonry-grid_column"
    >
      {topicComponents}
    </StyledTopicList>
  );
};

export default TopicList;
