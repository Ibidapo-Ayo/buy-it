"use server"
import { Cart, CreateProductsParams, ProductsProps } from "@/types";
import { createAdminClient, createSessionClient } from "./config";
import { InputFile } from "node-appwrite/file"
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const { DATABASE_ID, PRODUCT_ID, BUCKET_ID, CART_ID, USER_COLLECTION_ID } = process.env


export const getProducts = async () => {
    try {

        const { databases } = await createAdminClient()
        const products = await databases.listDocuments<ProductsProps>(
            DATABASE_ID!,
            PRODUCT_ID!
        )
        return products.documents
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

        return {
            product: product.documents[0],
            imageUrl: await getFilePreview(product.documents[0].imageId)
        }

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message)
        }
    }
}

export const searchProducts = async (searchString: string) => {

    const { databases } = await createSessionClient(cookies().get("session")?.value)

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
    const userId = cookies().get("userId")?.value
    try {
        const { databases } = await createSessionClient(cookies().get("session")?.value)
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
    const userId = cookies().get("userId")?.value
    try {
        const { databases } = await createSessionClient(cookies().get("session")?.value)

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
    try {
        const { databases } = await createSessionClient(cookies().get("session")?.value)
        await databases.updateDocument(
            DATABASE_ID!,
            CART_ID!,
            cartId,
            {
                quantity
            }
        )
        revalidatePath("/cart")
        return
    } catch (err) {
        if (err instanceof Error) {
            console.log(err.message);
        }
    }
}

export const deleteCarts = async (cartId: string) => {
    try {
        const { databases } = await createSessionClient(cookies().get("session")?.value)
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