

import React from 'react'
import Head from 'next/head';
import Banner from '@/components/landing-page/Banner';
import { PopularItems } from '@/components/landing-page/PopularItems';
import Product from '@/components/landing-page/products/Product';
import Services from '@/components/landing-page/products/services/services';
import { getProducts } from '@/appwrite/product.actions';


const Page = async () => {
  const products = await getProducts()

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full">
        <Banner />
        <div className='md:px-20 px-5'>
          <PopularItems />
        </div>
        <div className='md:px-20 px-5 mt-20 mb-20 space-y-10'>
          <Product products={products} />
          <Services />
        </div>
      </main>
    </>
  )
}

export default Page