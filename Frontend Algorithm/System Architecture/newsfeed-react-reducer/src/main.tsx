import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import './styles.css';
import { FeedProvider } from './store/feedStore';

async function enableMocking() {
  // Only enable MSW in dev (Vite sets import.meta.env.DEV)
  if (!import.meta.env.DEV) return;
  const { worker } = await import('./mocks/browser');
  await worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      // Works even if Vite base is configured.
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <FeedProvider>
        <App />
      </FeedProvider>
    </React.StrictMode>
  );
});
