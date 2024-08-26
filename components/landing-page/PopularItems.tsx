import * as React from "react"

import { images } from "@/constants"
import PopularItemsCard from "../PopularItemsCard"
import { StaticImageData } from "next/image"

type ItemsProps = {
  title: string,
  image: StaticImageData,
  colors?: string
}[]

export function PopularItems() {
  const items: ItemsProps = [
    {
      title: 'Fruits & Vegetation',
      image: images.fruits,
      colors: ""
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
    <div className="space-y-3">
      <h2 className="font-semibold text-xl tracking-tighter">Shop by category</h2>
      <div className="grid grid-cols-9 gap-4">
        {items.slice(0,9).map((item, index) => (
          <PopularItemsCard key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  )
}
