import TopLevelArticleForm from './components/TopLevelArticleForm';
import TopicList from './components/TopicList';
import { useArticles } from './context/articlesContext';
import ErrorModal from './components/ErrorModal';
import Spinner from './components/Spinner';

function App() {
  const { topicsOfArticles, deleteArticles, error, clearError, loading } =
    useArticles();
  return (
    <div className="App">
      <header className="header navbar">
        <h1 className="logo">Engram</h1>
      </header>
      <main className="app-main">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <TopicList
              topicsOfArticles={topicsOfArticles}
              deleteArticles={deleteArticles}
            />
            <TopLevelArticleForm />
          </>
        )}
      </main>
      {error && <ErrorModal error={error} clearError={clearError} />}
      <footer className="footer">
        &copy; {new Date().getFullYear()} Created by Sid Hayoun Lee at Juno
        College
      </footer>
    </div>
  );
}

export default App;
