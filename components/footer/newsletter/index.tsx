import NewsletterForm from '@/components/forms/NewsletterForm'
import React from 'react'

const NewsLetter = () => {
    return (
        <div className='w-full flex md:flex-row flex-col md:space-y-0 space-y-5 items-center justify-between'>
            <div className='space-y-2'>
                <h1 className='font-bold text-xl'>Join our newsletter for £10 offs</h1>
                <p className='text-secondary-200 text-xs w-96 font-normal'>Register now to get latest updates on promotions & coupons.Don’t worry, we not spam!</p>
            </div>
            <NewsletterForm />
        </div>
    )
}

export default NewsLetter