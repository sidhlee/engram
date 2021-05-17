import TopLevelArticleForm from './components/TopLevelArticleForm';
import TopicList from './components/TopicList';

function App() {
  return (
    <div className="App">
      <header className="header navbar">
        <h1 className="logo">Engram</h1>
      </header>
      <main className="app-main">
        <TopicList />
        <TopLevelArticleForm />
      </main>
    </div>
  );
}

export default App;
