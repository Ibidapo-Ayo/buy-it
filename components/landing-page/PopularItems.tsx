import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { images } from "@/constants"
import PopularItemsCard from "../PopularItemsCard"
import { StaticImageData } from "next/image"

type ItemsProps = {
  title: string,
  image: StaticImageData
}[]

export function PopularItems() {
  const items: ItemsProps = [
    {
      title: 'Fruits & Vegetation',
      image: images.fruits,
    },
    {
      title: 'Baby & Pregnancy',
      image: images.baby,
    },
    {
      title: 'Beverages',
      image: images.beverages,
    },
    {
      title: 'Meats & Seafood',
      image: images.meat,
    },
    {
      title: 'Biscuits & Snacks',
      image: images.biscuit,
    },
    {
      title: 'Breads & Bakery',
      image: images.bread,
    },
    {
      title: 'Dairy',
      image: images.dairy,
    },
    {
      title: 'Frozen Foods',
      image: images.frozen,
    },
    {
      title: 'Grocery & Staples',
      image: images.grocery,
    },
  ]
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/3 lg:basis-40">
            <PopularItemsCard title={item.title} image={item.image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
