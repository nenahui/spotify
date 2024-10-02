import { persistor, store } from '@/app/store';
import { addInterceptors } from '@/axiosApi';
import { GOOGLE_CLIENT_ID } from '@/constants';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { PersistGate } from 'redux-persist/integration/react';

addInterceptors(store);

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <StrictMode>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </StrictMode>
  </GoogleOAuthProvider>
);
