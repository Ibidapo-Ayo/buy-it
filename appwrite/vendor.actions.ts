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
            throw new Error(error.type)
        }
    }
}

export const getVendor = async () => {
    const cookieStore = await cookies()

    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value);

        const userId = cookieStore.get("userId")?.value;

        const result = await databases.listDocuments(
            DATABASE_ID!,
            VENDOR_ID!,
            [Query.equal("user", userId!)]
        )
        

        return result.documents
    } catch (error) {
        console.log(error);

    }
}