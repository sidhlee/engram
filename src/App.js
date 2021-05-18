import Main from './pages/Main';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from './pages/LogIn';
import { useAuth } from './context/authContext';

function App() {
  const { user } = useAuth();

  return (
    <Switch>
      <Route path="/login">
        <LogIn />
      </Route>
      {/* Only available when the user is authenticated */}
      {user && (
        <Route path="/" exact>
          <Main />
        </Route>
      )}
      {/* All other routes will be redirected to login page */}
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
