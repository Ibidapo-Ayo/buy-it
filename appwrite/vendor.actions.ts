"use server"

import { becomeVendorFormProps } from "@/types"
import { cookies } from "next/headers"
import { createAdminClient, createSessionClient } from "./config"
import { ID, Query } from "node-appwrite"
import { decryptKey } from "@/lib/utils"

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

export const getAllVendor = async () => {
    const cookieStore = await cookies()

    try {
        const { databases } = await createAdminClient();

        const userId = cookieStore.get("userId")?.value;

        const result = await databases.listDocuments(
            DATABASE_ID!,
            VENDOR_ID!,
        )
        return result.documents

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}

export const getVendor = async (email?: string, password?: string) => {
    const cookieStore = await cookies()

    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value);

        const userId = cookieStore.get("userId")?.value;

        const result = await databases.listDocuments(
            DATABASE_ID!,
            VENDOR_ID!,
            [Query.equal("user", userId!)]
        )

        if (email && password) {
            if (result) {
                if (decryptKey(result.documents[0].password) !== password! || result.documents[0].email !== email) {
                    throw new Error("Incorrect email/password")
                } else {
                    if (result.documents[0].status === "accepted") {
                        cookieStore.set("vendorId", result.documents[0].$id)
                    }
                    return result.documents
                }
            }
        }

        return result.documents

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message)
        }
    }
}