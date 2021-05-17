import Main from './pages/Main';
import { Switch, Route, Redirect } from 'react-router-dom';
import LogIn from './pages/LogIn';
import { useAuth } from './context/authContext';

function App() {
  const { user } = useAuth();
  // console.log('[App] user', user);

  return (
    <Switch>
      <Route path="/login">
        <LogIn />
      </Route>
      {user && (
        <Route path="/" exact>
          <Main />
        </Route>
      )}
      <Redirect to="/login" />
    </Switch>
  );
}

export default App;
