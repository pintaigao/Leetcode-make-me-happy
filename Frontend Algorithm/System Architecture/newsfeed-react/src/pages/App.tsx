import FeedList from '../components/FeedList';
import PostComposer from '../components/PostComposer';

export default function App() {
  return (
    <div>
      <div className="topbar">
        <div className="container" style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
          <div style={{fontWeight: 800, letterSpacing: '-0.02em'}}>News Feed (study build)</div>
          <div className="muted" style={{fontSize: 12}}>
            CSR + cursor pagination + infinite scroll
          </div>
        </div>
      </div>
      
      <main className="container" style={{display: 'flex', flexDirection: 'column', gap: 12}}>
        <PostComposer/>
        <FeedList/>
      </main>
    </div>
  );
}
