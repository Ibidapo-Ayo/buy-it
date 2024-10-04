"use server"
import { CreateProductsParams, ProductsProps } from "@/types";
import { createAdminClient } from "./config";
import { InputFile } from "node-appwrite/file"
import { ID, Query } from "node-appwrite";
import { revalidatePath } from "next/cache";

const { DATABASE_ID, PRODUCT_ID, BUCKET_ID } = process.env

export const getProducts = async () => {
    try {

        const { databases, storage } = await createAdminClient()
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

        console.log(updateDocument);

        // revalidatePath(`/dashboard/products/${updateDocument.$id}/edit`)


    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

        }
    }
}