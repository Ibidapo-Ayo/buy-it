import { StaticImageData } from "next/image"
import { Models } from "node-appwrite"

export type PriceCardProps = {
    price: number,
    striked_price?: number
}

declare type ItemsCardProps = {
    title: string,
    price: number,
    striked_price?: number,
    image: string | undefined,
    productType?: "organic" | "cold-sale",
    inStock?: number,
    availableItems?: number,
    totalItems?: number,
    path?: string,
    className?: string,
    cardClassName?: string,
    rating?: number,
    comments?: string,
    offer?: {
        percentage: number,
        endTime: string
    }
}

declare type ItemsProps = {
    title: string,
    image: StaticImageData,
    colors?: string
}

declare type RegisterParams = {
    email: string,
    password: string,
    username: string
}

declare type CreateProductsParams = {
    name: string,
    price: string,
    strikedPrice?: string,
    description: string,
    availableProducts?: string,
    totalProducts?: string,
    image?: FormData| undefined
}

declare interface ProductsProps extends Omit<CreateProductParams, "image">, Models.Document {
    imageUrl: string,
    imageId: string
}