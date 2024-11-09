"use server"

import { becomeVendorFormProps } from "@/types"
import { cookies } from "next/headers"
import { createSessionClient } from "./config"
import { ID } from "node-appwrite"

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
        if (error instanceof Error) {
            // console.log(error.message);
            console.log(error)
        }
    }
}