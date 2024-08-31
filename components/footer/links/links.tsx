import { goodToKnow, letUsHelpYou, makeMoney } from '@/constants/data/footer/links'
import Link from 'next/link'
import React from 'react'

const FooterLinks = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            <ul className='flex flex-col space-y-5'>
                <h1 className='font-bold text-md'>Make Money with us</h1>
                <div className='flex flex-col space-y-2'>
                    {makeMoney.map((link, index) => {
                        const { title, path } = link
                        return (
                            <Link key={index} href={path} className='hover:ml-2 transform duration-300'>
                                <li className='text-xs text-secondary-200'>{title}</li>
                            </Link>
                        )
                    })}
                </div>
            </ul>
            <ul className='flex flex-col space-y-5'>
                <h1 className='font-bold text-md'>Let Us Help You</h1>
                <div className='flex flex-col space-y-2'>
                    {letUsHelpYou.map((link, index) => {
                        const { title, path } = link
                        return (
                            <Link key={index} href={path} className='hover:ml-2 transform duration-300'>
                                <li className='text-xs text-secondary-200'>{title}</li>
                            </Link>
                        )
                    })}
                </div>
            </ul>
            <ul className='flex flex-col space-y-5'>
                <h1 className='font-bold text-md'>Let Us Help You</h1>
                <div className='flex flex-col space-y-2'>
                    {goodToKnow.map((link, index) => {
                        const { title, path } = link
                        return (
                            <Link key={index} href={path} className='hover:ml-2 transform duration-300'>
                                <li className='text-xs text-secondary-200'>{title}</li>
                            </Link>
                        )
                    })}
                </div>
            </ul>
        </div>
    )
}

export default FooterLinks