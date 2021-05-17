import { ArticlesProvider } from '../context/articlesContext';
import TopLevelArticleForm from '../components/TopLevelArticleForm';
import TopicList from '../components/TopicList';
import { useArticles } from '../context/articlesContext';
import ErrorModal from '../components/ErrorModal';
import Spinner from '../components/Spinner';
import { useAuth } from '../context/authContext';
import { useHistory } from 'react-router';

const Main = () => {
  // console.log('[Main]');
  const { topicsOfArticles, deleteArticles, error, clearError, loading } =
    useArticles();

  const { logOut } = useAuth();
  const history = useHistory();

  const handleLogOutButtonClick = async () => {
    // If you don't wait for logOut here, you'll get redirected immediately to the login page,
    // then because the user hasn't been cleared out by Firebase yet, user will be again, redirected to the main page
    // When Firebase finally runs 'onAuthStateChanged` callback after clearing out the user from firebase,
    // Our app gets re-rendered while still in the main path, and this time, we don't have user
    // so <Main/> don't get mounted, but we're not redirecting the user to the /login page neither.
    // That's why we end up with body with nothing.
    await logOut();
    // by waiting for logOut to finish,
    // we're only redirecting the user to the login page after user is cleared out.
    // console.log('logged out. push login');
    history.push('/login');
  };
  return (
    <ArticlesProvider>
      <div className="App">
        <header className="header navbar">
          <h1 className="logo">Engram</h1>
          <button className="button-bg" onClick={handleLogOutButtonClick}>
            LogOut
          </button>
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
    </ArticlesProvider>
  );
};

export default Main;
