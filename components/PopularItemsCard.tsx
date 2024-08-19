import Image, { StaticImageData } from 'next/image'
import React from 'react'
import { Card, CardContent } from './ui/card'

type PopularItemsCardProps = {
    title: string,
    image: StaticImageData
}

const PopularItemsCard = ({ title, image }: PopularItemsCardProps) => {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center cursor-pointer px-3.5 ">
                <Image src={image} width={1000} height={1000} quality={100} priority className='' alt={`${title} image`} />
                <h3 className='font-bold text-xs'>{title}</h3>
            </CardContent>
        </Card>
    )
}

export default PopularItemsCard