"use server"
import { Cart, CreateProductsParams, ProductsProps } from "@/types";
import { createAdminClient, createSessionClient } from "./config";
import { InputFile } from "node-appwrite/file"
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const { DATABASE_ID, PRODUCT_ID, BUCKET_ID, CART_ID, WISHLIST_COLLECTION } = process.env


export const getProducts = async (category?: string) => {
    try {

        const { databases } = await createAdminClient()

        if (category) {
            const categoryProducts = await databases.listDocuments(
                DATABASE_ID!,
                PRODUCT_ID!,
                [Query.contains("category", category.toLowerCase())]
            );

            return categoryProducts.documents
        } else {
            const products = await databases.listDocuments<ProductsProps>(
                DATABASE_ID!,
                PRODUCT_ID!
            )

            return products.documents
        }

    } catch (error) {
        console.log(error);
    }
}

export const getFilePreview = async (imageId: string) => {
    try {
        const { storage } = await createAdminClient()
        const productImage = await storage.getFileView(
            BUCKET_ID!,
            imageId,
        )
        const buffer = Buffer.from(productImage).toString("base64");
        const image = `data:image/png;base64,${buffer}`

        return image
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export const getProduct = async (productId: string) => {
    try {

        const { databases } = await createAdminClient()
        const product = await databases.listDocuments<ProductsProps>(
            DATABASE_ID!,
            PRODUCT_ID!,
            [Query.equal("$id", productId)]
        )

        return product.documents[0]

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const searchProducts = async (searchString: string) => {
    const cookieStore = await cookies()
    const { databases } = await createSessionClient(cookieStore.get("session")?.value)

    try {
        const result = await databases.listDocuments(
            DATABASE_ID!,
            PRODUCT_ID!,
            [Query.contains("name", searchString), Query.contains("description", searchString)]
        );

        return result.documents
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
        }
    }
}

export const createProducts = async ({ image, ...products }: CreateProductsParams) => {
    try {
        let file;
        const { storage, databases } = await createAdminClient()


        const imageFile = InputFile.fromBuffer(image?.get("blobFile") as Blob, image?.get("fileName") as string)
        file = await storage.createFile(process.env.BUCKET_ID!, ID.unique(), imageFile)
        const newProduct = await databases.createDocument(
            DATABASE_ID!,
            PRODUCT_ID!,
            ID.unique(),
            {
                imageId: file?.$id,
                productImageUrl: await getFilePreview(file.$id),
                ...products
            },
        )

        return newProduct && newProduct;

    } catch (error) {
        console.log(error);
    }
}

export const updateProducts = async (productId: string, data: {
    name: string,
    description: string,
    strikedPrice?: string | undefined;
    availableProducts?: string | undefined;
    totalProducts?: string | undefined,
    price: string
}) => {
    try {

        const { databases } = await createAdminClient()
        const updateDocument = await databases.updateDocument(DATABASE_ID!, PRODUCT_ID!, productId, {
            ...data
        })

        revalidatePath(`/dashboard/products/${updateDocument.$id}/edit`)

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

        }
    }
}


// TODO: simplify this apis
export const getCart = async () => {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value)
        const data = await databases.listDocuments(
            DATABASE_ID!,
            CART_ID!,
            [Query.equal("user", userId!)]
        )

        return data.documents
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
        }
    }
}

export const AddProductToCart = async (productId?: string, quantity?: number) => {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value)

        if (!userId) {
            throw new Error("no-user")
        }

        await databases.createDocument(
            DATABASE_ID!,
            CART_ID!,
            ID.unique(),
            {
                user: userId,
                product: productId,
                quantity: quantity || 1
            }
        )

        const cart = await getCart()
        return cart
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

        }
    }
}

export const updateCarts = async (cartId: string, quantity: number) => {
    const cookieStore = await cookies()
    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value)
        await databases.updateDocument(
            DATABASE_ID!,
            CART_ID!,
            cartId,
            {
                quantity
            }
        )

        const cart = await getCart()
        return cart
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

export const addToWishList = async (productId: string, userId: string) => {
    try {
        const cookieStore = await cookies()

        const { databases } = await createSessionClient(cookieStore.get("session")?.value)

        await databases.createDocument(
            DATABASE_ID!,
            WISHLIST_COLLECTION!,
            ID.unique(),

            {
                product: productId,
                user: userId
            }
        )

        const wishLists = await databases.listDocuments(
            DATABASE_ID!,
            WISHLIST_COLLECTION!
        )

        return wishLists.documents
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

        }
    }
}

export const deleteCarts = async (cartId: string) => {
    const cookieStore = await cookies()
    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value)
        await databases.deleteDocument(
            DATABASE_ID!,
            CART_ID!,
            cartId
        )
        revalidatePath("/cart")
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);

        }
    }
}