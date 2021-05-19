import { Switch, Route, Redirect } from 'react-router-dom';
import { useAuth } from './context/authContext';
import Main from './pages/Main';
import LogIn from './pages/LogIn';
import About from './pages/About';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user } = useAuth();

  return (
    <>
      <Switch>
        {/* Default route */}
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        {/* Only available when the user is authenticated */}
        <ProtectedRoute path="/" exact authenticated={user}>
          <Main />
        </ProtectedRoute>
        {/* All other routes will be redirected to login page */}
        <Redirect to="/login" />
      </Switch>
    </>
  );
}

export default App;
