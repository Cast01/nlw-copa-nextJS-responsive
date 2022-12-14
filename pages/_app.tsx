import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContext';

import '../styles/global.css';

export default function App({ Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <GoogleOAuthProvider clientId="464470902416-c5l6e1qjviaiig4lhg9q65j7hjjv3g5j.apps.googleusercontent.com">
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}
