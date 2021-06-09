import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { useAuth } from '../context/authContext';
import { Link } from 'react-router-dom';
import { mixins } from '../styles';

const StyledLogIn = styled.div`
  height: 100vh;
  ${mixins.flexCenter}
  flex-direction: column;
  text-align: center;

  .login-buttons {
    margin: 1rem;
  }
  .login-button {
    margin: 0.25rem;
  }

  a.about {
    font-size: 1.4rem;
  }
`;

const LogIn = () => {
  const { signIn, user } = useAuth();
  const history = useHistory();

  // console.log(`[LogIn] user: ${user}`);

  const handleGoogleSignInClick = async () => {
    try {
      signIn();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      // If successfully signed in, redirect to main page
      history.push('/');
    }
  }, [user, history]);

  return (
    <StyledLogIn className="LogIn">
      <Helmet>
        <title>Engram | Sign In</title>
      </Helmet>
      <div className="login-screen">
        <header>
          <h1>
            <Logo />
          </h1>
        </header>
        <main>
          <div className="login-buttons">
            <button
              className="login-button button-bg login-demo"
              onClick={() => signIn('asDemo')}
            >
              Try Demo
            </button>
            <button
              className="login-button button-bg login-google"
              onClick={handleGoogleSignInClick}
            >
              Sign In with Google
            </button>
          </div>
          <Link className="button-md inverse accent about" to="/about">
            What is Engram?
          </Link>
        </main>
      </div>
    </StyledLogIn>
  );
};
export default LogIn;
