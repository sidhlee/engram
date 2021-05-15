import { useEffect } from 'react';
import firebase from './config/firebase';
import ArticleForm from './components/ArticleForm';

const userKey = 'demo';

function App() {
  useEffect(() => {
    const articlesRef = firebase.database().ref(userKey);

    const unsubscribe = articlesRef.on('value', (dataSnapshot) => {
      const data = dataSnapshot.val();
      console.log(data);
    });
    return unsubscribe;
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <div className="logo">
          <h1>Engram</h1>
        </div>
      </header>
      <main className="AppMain">
        <ArticleForm />
      </main>
    </div>
  );
}

export default App;
