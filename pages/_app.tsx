import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';
import { AuthContextProvider } from '../contexts/AuthContext';

import '../styles/global.css';

export default function App({ Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_ID}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}