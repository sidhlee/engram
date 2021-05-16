import useArticles from './hooks/useArticles';
import TopLevelArticleForm from './components/TopLevelArticleForm';
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
        <TopLevelArticleForm addArticle={addArticle} />
      </main>
    </div>
  );
}

export default App;
