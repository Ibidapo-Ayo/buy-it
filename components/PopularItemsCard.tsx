import { generateProductLink } from '@/lib/utils'
import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

type PopularItemsCardProps = {
    title: string,
    image: StaticImageData
}

const PopularItemsCard = ({ title, image }: PopularItemsCardProps) => {
    return (
        <div className='space-y-3 cursor-pointer w-auto rounded-md flex flex-col justify-center items-center py-5'>
            <Link href={`/products/?category=${title}`}>
                <div className=''>
                    <Image src={image} width={1000} height={1000} className='w-44 md:w-24 scale-90 hover:scale-95 transform' alt={`${title} image`} unoptimized />
                </div>
                <h3 className='font-bold text-xs text-center'>{title}</h3>
            </Link>
        </div>
    )
}

export default PopularItemsCard