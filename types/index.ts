import { StaticImageData } from "next/image"

export type PriceCardProps = {
    price: number,
    striked_price?: number
}

export type ItemsCardProps = {
    title: string,
    price: number,
    striked_price?: number,
    image: string[],
    productType?: "organic" | "cold-sale",
    inStock?: number,
    availableItems?: number,
    totalItems?: number,
    path: string,
    className?: string,
    cardClassName?: string,
    rating?: number,
    comments?: string,
    offer?: {
        percentage: number,
        endTime: string
    }
}

export type ItemsProps = {
    title: string,
    image: StaticImageData,
    colors?: string
  }

  export type RegisterParams = {
    email: string,
    password: string,
    username: string
  }