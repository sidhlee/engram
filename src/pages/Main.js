import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArticlesProvider, useArticles } from '../context/articlesContext';
import { useAuth } from '../context/authContext';
import { useHistory, useLocation } from 'react-router';

import Navbar from '../components/Navbar';
import MenuButton from '../components/MenuButton';
import MenuModal from '../components/MenuModal';
import TopicList from '../components/Topic/TopicList';
import TopLevelArticleForm from '../components/TopLevelArticleForm';
import Footer from '../components/Footer';
import Spinner from '../components/Spinner';
import ErrorModal from '../components/ErrorModal';

const Main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { topicsOfArticles, deleteArticles, error, clearError, loading } =
    useArticles();

  /**
   * @type {{user: import('../context/authContext').User}}
   */
  const { logOut, user } = useAuth();

  const history = useHistory();

  // https://reactrouter.com/web/guides/scroll-restoration/scroll-to-top
  const { pathname } = useLocation();
  // Scroll to top when navigated
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const logOutAndRedirect = async () => {
    // If you don't wait for logOut here, you'll get redirected immediately to the login page,
    // then because the user hasn't been cleared out by Firebase yet, user will be again, redirected to the main page.
    // When Firebase finally runs 'onAuthStateChanged` callback after clearing out the user from firebase,
    // our app gets re-rendered while still in the main path, and this time, we don't have user
    // so <Main/> don't get mounted, but we're not redirecting the user to the /login page either.
    // That's why we end up with body with nothing.
    await logOut();
    // by waiting for logOut to finish,
    // we're only redirecting the user to the login page after user is cleared out.
    // console.log('logged out. push login');
    history.push('/login');
  };
  return (
    <div className="App">
      <Helmet>
        <title>Engram | Main</title>
      </Helmet>

      <MenuButton
        toggleMenu={() => setIsMenuOpen((show) => !show)}
        isMenuOpen={isMenuOpen}
      />
      <MenuModal
        isMenuOpen={isMenuOpen}
        userImgURL={user.photoURL}
        userName={user.name}
        logOut={logOut}
        closeMenu={() => setIsMenuOpen(false)}
      />
      <header>
        <Navbar
          logOut={logOutAndRedirect}
          userName={user.name}
          userImageURL={user.photoURL}
        />
      </header>
      <main className="app-main">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <TopicList
              topicsOfArticles={topicsOfArticles}
              deleteArticles={deleteArticles}
              userId={user.id}
            />
            <TopLevelArticleForm />
          </>
        )}
      </main>
      <Footer />
      {error && <ErrorModal error={error} clearError={clearError} />}
    </div>
  );
};

const ProvidedMain = () => {
  return (
    <ArticlesProvider>
      <Main />
    </ArticlesProvider>
  );
};

export default ProvidedMain;
