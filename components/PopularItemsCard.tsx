import Image, { StaticImageData } from 'next/image'
import React from 'react'

type PopularItemsCardProps = {
    title: string,
    image: StaticImageData
}

const PopularItemsCard = ({ title, image }: PopularItemsCardProps) => {
    return (
        <div className='space-y-3 cursor-pointer w-auto rounded-md flex flex-col justify-center items-center py-5'>
            <div className=''><Image src={image} width={100} height={100} className='w-20 scale-90 hover:scale-95 transform' alt={`${title} image`} unoptimized /></div>
            <h3 className='font-bold text-xs'>{title}</h3>
        </div>
    )
}

export default PopularItemsCard