import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>JSON Parser Pro - Free Online JSON Formatter, Validator & Beautifier</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5941228464873656"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      <Component {...pageProps} />
    </>
  )
}