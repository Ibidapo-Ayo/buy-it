"use server"

import { becomeVendorFormProps } from "@/types"
import { cookies } from "next/headers"
import { createSessionClient } from "./config"
import { ID, Query } from "node-appwrite"

const { DATABASE_ID, VENDOR_ID } = process.env

export const createVendorAccount = async (data: becomeVendorFormProps) => {
    const cookieStore = await cookies()
    try {
        const userId = cookieStore.get("userId")?.value
        const session = cookieStore.get("session")?.value

        const { databases } = await createSessionClient(session)

        const result = await databases.createDocument(
            DATABASE_ID!,
            VENDOR_ID!,
            ID.unique(),
            {
                user: userId,
                ...data
            }
        )

        await cookieStore.set("vendorId", result.$id)
        return result
    } catch (error) {
        // @ts-ignore
        if (error?.code === 409) {
            // @ts-ignore
            throw new Error("User already exist in our database, please login to your dashboard")
        }
    }
}

export const getVendor = async (email?: string) => {
    const cookieStore = await cookies()

    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value);

        const userId = cookieStore.get("userId")?.value;

        const result = await databases.listDocuments(
            DATABASE_ID!,
            VENDOR_ID!,
            email ? [Query.equal("email", email!)] : [Query.equal("user", userId!)]
        )

        console.log(result)

        return result.documents
    } catch (error) {
        console.log(error);

    }
}