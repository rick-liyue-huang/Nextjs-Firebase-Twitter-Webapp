import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

/**
 * @define SessionProvider can get the session info globally, including user email and image
 * @param
 * @returns
 */
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider
      // Provider options are not required but can be useful in situations where
      // you have a short session maxAge time. Shown here with default values.
      session={pageProps.session}
    >
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
