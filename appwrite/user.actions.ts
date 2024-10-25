"use server"
import { ID, Query } from "appwrite"
import { createAdminClient } from "./config"
import { RegisterParams } from "@/types"
import { decryptKey, encryptKey } from "@/lib/utils"
import { cookies } from "next/headers"
const { DATABASE_ID, USER_COLLECTION_ID } = process.env


export const register = async ({ email, password, username }: RegisterParams) => {
    const cookieStore = await cookies()
    try {
        const { account, databases } = await createAdminClient()

        const newAccount = await account.create(ID.unique(),
            email,
            password,
            username

        )

        const newUser = await databases.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                email: email,
                name: username,
                accountId: newAccount.$id,
                password: encryptKey(password),
            }
        )

        cookieStore.set("userId", newUser.$id)
        if (!newAccount) return newUser
    } catch (error) {
        if (error) {
            throw new Error("user already exist")
        }
    }
}


export const login = async (email: string, password: string) => {
    const cookieStore = await cookies()
    try {
        const { databases } = await createAdminClient()

        const user = await databases.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("email", email)]
        )

        if (user) {
            const decryptedPassword = decryptKey(user.documents[0].password)
            if (decryptedPassword === password) {
                const { account } = await createAdminClient()

                const session = await account.createEmailPasswordSession(
                    email,
                    password
                )

                cookieStore.set("session", session.secret, {
                    httpOnly: true,
                    sameSite: "strict",
                    secure: true,
                    expires: new Date(session.expire),
                    path: "/"
                })

                cookieStore.set("userId", user.documents[0].$id)

                return session.secret
            } else {
                throw new Error("incorrect password")
            }
        } else {
            throw new Error("user does not exist")
        }

    } catch (error) {
        if (error) {
            throw new Error(`${error}`)
        }

        console.log(error)
    }
}

export const saveAdminPasskey = async (passkey: string) => {
    const cookieStore = await cookies()
    cookieStore.set("adminPasskey", passkey)
}

export const logout = async () => {
    const cookieStore = await cookies()
    try {
        await cookieStore.delete("adminPasskey")
    } catch (error) {
        console.log(error)
    }
}