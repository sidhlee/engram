import { useEffect, useState } from 'react';
import firebase from './config/firebase';
import ArticleForm from './components/ArticleForm';
import Topic from './components/Topic';

export const userKey = 'demo';

function App() {
  const [articles, setArticles] = useState([]);

  const topicNames = articles.reduce((topics, article) => {
    if (!topics.includes(article.topic)) {
      topics.push(article.topic);
    }
    return topics;
  }, []);

  useEffect(() => {
    const articlesRef = firebase.database().ref(userKey);

    const unsubscribe = articlesRef.on('value', (dataSnapshot) => {
      const data = dataSnapshot.val();
      console.log(data);

      const currentArticles = Object.entries(data).map(([key, val]) => ({
        ...val,
        id: key,
      }));

      setArticles(currentArticles);
    });
    return unsubscribe;
  }, []);

  /**
   * Add an article to user's db
   * @param {Article} article
   */
  const addArticle = (article) => {
    const articlesRef = firebase.database().ref(userKey);
    articlesRef.push(article);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h1>Engram</h1>
        </div>
      </header>
      <main className="app-main">
        <ul className="Topics">
          {topicNames.map((topicName) => {
            const articlesByTopic = articles.filter(
              (article) => article.topic === topicName
            );
            return <Topic key={topicName} articles={articlesByTopic} />;
          })}
        </ul>
        <ArticleForm addArticle={addArticle} />
      </main>
    </div>
  );
}

export default App;
