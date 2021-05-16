import Topic from './Topic';

const TopicList = ({ topicsOfArticles }) => {
  const topicComponents = Object.entries(topicsOfArticles).map(
    ([topicName, articlesByTopic]) => (
      <Topic key={topicName} articles={articlesByTopic} />
    )
  );

  return <ul className="Topics">{topicComponents}</ul>;
};

export default TopicList;
