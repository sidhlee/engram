import useArticles from './hooks/useArticles';
import ArticleForm from './components/ArticleForm';
import TopicList from './components/TopicList';

function App() {
  const { topicsOfArticles, addArticle } = useArticles();

  return (
    <div className="App">
      <header className="header navbar">
        <h1 className="logo">Engram</h1>
      </header>
      <main className="app-main">
        <TopicList topicsOfArticles={topicsOfArticles} />
        <ArticleForm addArticle={addArticle} />
      </main>
    </div>
  );
}

export default App;
