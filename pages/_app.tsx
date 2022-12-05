import { GoogleOAuthProvider } from '@react-oauth/google';
import type { AppProps } from 'next/app';

import { AuthContextProvider } from '../contexts/AuthContext';

import '../styles/global.css';

export default function App({ Component, pageProps: {session, ...pageProps}}: AppProps) {
  return (
    <GoogleOAuthProvider clientId="464470902416-633oh7j3142pdkc4t0qn755pfb87jdec.apps.googleusercontent.com">
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </GoogleOAuthProvider>
  );
}
