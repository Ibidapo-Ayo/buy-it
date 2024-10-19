
import LandingPage from '@/components/landing-page/landing-page'
import React from 'react'
import Head from 'next/head';


const Page = () => {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <LandingPage />
      </main>
    </>
  )
}

export default Page