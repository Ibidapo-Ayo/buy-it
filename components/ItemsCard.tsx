import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from './ui/card'

type ItemsCardProps = {
    title: string,
    price: string,
    striked_price?: string,
    percentage?: string,
    itemsLeft?: string,
    image: string
}

const ItemsCard = ({ title, price, percentage, itemsLeft, striked_price, image }: ItemsCardProps) => {
    return (
        <Card>
            <CardContent className="flex aspect-square items-center justify-center">
                <Image src={image} alt='alt' height={1000} width={1000} />
            </CardContent>
        </Card>
    )
}

export default ItemsCard