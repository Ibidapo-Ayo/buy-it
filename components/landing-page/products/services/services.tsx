import { images } from '@/constants'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

type ServicesArrayProps = {
    title: string,
    description: string,
    image: StaticImageData
}[]
const Services = () => {
    const services: ServicesArrayProps = [
        {
            title: "Payment only online",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
            image: images.services.payment
        },
        {
            title: "New stocks and sales",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
            image: images.services.stocks
        },
        {
            title: "Quality assurance",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
            image: images.services.quality
        },
        {
            title: "Delivery from 1 hour",
            description: "Tasigförsamhet beteendedesign. Mobile checkout. Ylig kärrtorpa.",
            image: images.services.delivery
        },
    ]
    return (
        <div className='grid grid-cols-4'>
            {services.map((service, index) => {
                const { title, description, image } = service
                return (
                    <div key={index} className='grid grid-cols-[auto,1fr] gap-4'>
                        <Image src={image} width={1000} height={1000} alt={`${title} image`} className='w-12' />
                        <div className=''>
                            <h1 className='text-sm font-bold'>{title}</h1>
                            <p className='text-xs text-secondary-200'>{description}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Services