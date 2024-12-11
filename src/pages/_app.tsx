import '~/styles/global.css';

import type {AppProps} from 'next/app';
import {Bitter, PT_Serif} from 'next/font/google';
import {lazy} from 'react';

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import('~/components/PreviewProvider'));


const sans = Bitter({
  variable: '--font-family-sans',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

const serif = PT_Serif({
  variable: '--font-family-serif',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
});

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const {draftMode, token} = pageProps;
  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-family-sans: ${sans.style.fontFamily};
            --font-family-serif: ${serif.style.fontFamily};
          }
        `}
      </style>
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
    </>
  );
}
