import FeedList from '../components/FeedList';
import PostComposer from '../components/PostComposer';
import './App.scss'

export default function App() {
  return (
    <div>
      <div className="topbar">
        <div className="header-container">
          <div className="title">News Feed (study build)</div>
          <div className="muted" style={{fontSize: 12}}>
            CSR + cursor pagination + infinite scroll
          </div>
        </div>
      </div>
      
      <main className="main-container">
        <PostComposer/>
        <FeedList/>
      </main>
    </div>
  );
}
