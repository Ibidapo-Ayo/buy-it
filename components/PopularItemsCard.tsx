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
                    <Image src={image} width={100} height={100} className='w-24 scale-90 hover:scale-95 transform' alt={`${title} image`} unoptimized />
                </div>
                <h3 className='font-bold text-xs'>{title}</h3>
            </Link>
        </div>
    )
}

export default PopularItemsCard