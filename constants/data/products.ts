import { generateProductLink } from "@/lib/utils";

export type ProductTypes = {
    name: string,
    price: number,
    strikedPrice: number,
    type: "organic",
    availableItems: number,
    totalItems: number;
    images: string[],
    path: string
}[]

export type OfferProductsTypes = {
    name: string,
    price: number,
    strikedPrice: number,
    type?: string,
    availableItems: number,
    totalItems: number;
    images: string[],
    path: string,
    offer: {
        percentage: number,
        endTime: string
    },
    rating: number,
    comments: number
}[]

export const products: ProductTypes = [
    {
        name: "Large Bagged Oranges",
        price: 1.50,
        strikedPrice: 2.50,
        type: 'organic',
        availableItems: 23,
        totalItems: 100,
        images: [
            "/images/products/product-10.png",
        ]
    },
    {
        name: "100% Percent Apple Juice - 64 fl oz Bottle",
        price: 1.50,
        strikedPrice: 2.50,
        type: "organic",
        availableItems: 23,
        totalItems: 100,
        images: [
            "/images/products/product-1.png",
        ]
    },
    {
        name: "Great Value Rising Crust Frozen Pizza, Supreme",
        price: 8.99,
        strikedPrice: 11.32,
        availableItems: 50,
        totalItems: 200,
        images: [
            "/images/products/product-2.png"
        ],
        type: "organic"
    },
    {
        name: "Simply Orange Pulp Free Juice - 52 fl oz",
        price: 2.46,
        strikedPrice: 4.13,
        type: "organic",
        availableItems: 20,
        totalItems: 300,
        images: [
            "/images/products/product-3.png"
        ]
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust",
        price: 11.77,
        strikedPrice: 13.87,
        availableItems: 19,
        totalItems: 60,
        images: [
            "/images/products/product-4.png"
        ],
        type: "organic"
    },
    {
        name: "Cantaloupe Melon Fresh Organic Cut",
        price: 1.26,
        strikedPrice: 3.42,
        type: "organic",
        availableItems: 16,
        totalItems: 100,
        images: [
            "/images/products/product-5.png"
        ]
    },
    {
        name: "Angel Soft Toilet Paper, 6 Mega Rolls",
        price: 14.12,
        strikedPrice: 21.92,
        availableItems: 33,
        totalItems: 30,
        images: [
            "/images/products/product-6.png"
        ],
        type: "organic"
    }
].map(product => ({
    ...product,
    path: `products/${generateProductLink(product.name)}`
}));

export const offerProducts: OfferProductsTypes = [
    {
        name: "USDA Choice Angus Beef T-Bone Steak – 0.70-1.50 lbs …",
        price: 0.20,
        strikedPrice: 1.25,
        types: "cold-sale",
        availableItems: 23,
        totalItems: 100,
        images: [
            "/images/products/product-7.png",
        ],
        offer: {
            percentage: 60,
            endTime: "2024-10-01T23:59:59Z"
        },
        rating: 3,
        comments: 12
    },
    {
        name: "Great Value Rising Crust Frozen Pizza, Supreme",
        price: 7.19,
        strikedPrice: 11.32,
        availableItems: 50,
        totalItems: 200,
        images: [
            "/images/products/product-2.png"
        ],
        offer: {
            percentage: 20,
            endTime: "2024-12-31T23:59:59Z"
        },
        rating: 2,
        comments: 40
    },
    {
        name: "Simply Orange Pulp Free Juice - 52 fl oz",
        price: 1.60,
        strikedPrice: 4.13,
        types: "cold-sale",
        availableItems: 20,
        totalItems: 300,
        images: [
            "/images/products/product-3.png"
        ],
        offer: {
            percentage: 35,
            endTime: "2024-11-10T23:59:59Z"
        },
        rating: 4,
        comments: 22
    },
    {
        name: "California Pizza Kitchen Margherita, Crispy Thin Crust",
        price: 8.83,
        strikedPrice: 13.87,
        availableItems: 19,
        totalItems: 60,
        images: [
            "/images/products/product-4.png"
        ],
        offer: {
            percentage: 25,
            endTime: "2024-10-05T23:59:59Z"
        },
        rating: 1,
        comments: 30
    },
    {
        name: "Cantaloupe Melon Fresh Organic Cut",
        price: 1.07,
        strikedPrice: 3.42,
        types: "organic",
        availableItems: 16,
        totalItems: 100,
        images: [
            "/images/products/product-5.png"
        ],
        offer: {
            percentage: 15,
            endTime: "2024-08-30T23:59:59Z"
        },
        rating: 2,
        comments: 8
    },
    {
        name: "Angel Soft Toilet Paper, 6 Mega Rolls",
        price: 12.71,
        strikedPrice: 21.92,
        availableItems: 33,
        totalItems: 30,
        images: [
            "/images/products/product-6.png"
        ],
        offer: {
            percentage: 10,
            endTime: "2024-09-15T23:59:59Z"
        },
        rating: 0,
        comments: 35
    }
].map(product => ({
    ...product,
    path: `products/${generateProductLink(product.name)}`
}));


