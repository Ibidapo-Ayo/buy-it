import React from 'react'
import NewsLetter from './newsletter'
import Links from './links'
import { termsLinks } from '@/constants/data/footer/links'
import Link from 'next/link'

const Footer = () => {
  return (
    <div className='w-full bg-secondary-100 h-full md:h-auto px-5 md:px-40 pt-10 space-y-16 divide-y-2'>
      <NewsLetter />
      <Links />

      <div className='py-20'>
        <div className='flex md:flex-row flex-col justify-between items-center md:space-y-0 space-y-5'>
          <p className='text-secondary-200 text-xs md:text-start text-center'>Copyright 2024 © Grogin WooCommerce WordPress Theme. All right reserved. Powered by KLBTheme.</p>

          <div className='flex space-x-3'>
            {termsLinks.map((terms, index) => (
              <Link href={terms.path} key={index} className='underline text-xs'>{terms.title}</Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer