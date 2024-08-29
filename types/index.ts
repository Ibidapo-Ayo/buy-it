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
    rating?: number,
    comments?: string,
    offer?: {
        percentage: number,
        endTime: string
    }
}