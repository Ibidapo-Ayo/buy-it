import { becomeVendorFormSchema } from "@/constants/validations"
import { StaticImageData } from "next/image"
import { Models } from "node-appwrite"
import { z } from "zod"

export type PriceCardProps = {
    price: number,
    striked_price?: number
}
declare type ItemsProps = {
    title: string,
    image: StaticImageData,
    colors?: string
}

declare type RegisterParams = {
    email: string,
    password: string,
    username: string,
}

declare interface CreateProductsParams {
    name: string,
    price: string,
    strikedPrice?: string,
    description: string,
    availableProducts?: string,
    totalProducts?: string,
    image?: FormData | undefined,
    category?: string
}

declare interface UserInfoParams extends Models.Document {
    bio?: string,
    address?: string,
    name?: string,
    image?: FormData | undefined,
    phone_number?: string,
    email?: string,
    accountId?: string
}
declare interface ProductsProps extends Omit<CreateProductParams, "image">, Models.Document, Document {
    productImageUrl: string,
    imageId: string
}

declare type ContextProps = State & {
    dispatch: React.Dispatch<ActionType<Actions, any>>
}

declare type ActionType<T = string, P = any> = {
    type: T
    payload?: P
}

declare type Actions = "add-to-cart" | "update" | "create" | "get-carts"

declare type Cart = {
    $id: string,
    product: ProductsProps,
    user: {
        accountId?: string,
        name?: string
    },
    quantity: number
}

declare type State = {
    carts?: Cart[],
    totalCarts?: number,
}

declare type becomeVendorFormProps = z.infer<typeof becomeVendorFormSchema> & { status?: "processing" | "declined" | "accepted" } & Models.Document