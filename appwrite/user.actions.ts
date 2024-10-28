"use server"
import { ID, Query } from "appwrite"
import { createAdminClient, createSessionClient } from "./config"
import { RegisterParams, UserInfoParams } from "@/types"
import { decryptKey, encryptKey } from "@/lib/utils"
import { cookies } from "next/headers"
import { InputFile } from "node-appwrite/file"
import { getFilePreview } from "./product.actions"
import { revalidatePath } from "next/cache"
const { DATABASE_ID, USER_COLLECTION_ID, USERIMAGE_BUCKETID } = process.env


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

export const updateUserInfo = async ({ image, ...userInfo }: UserInfoParams) => {

    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    try {

        let file;
        const { storage, databases } = await createAdminClient()
        if (typeof image !== "string") {
            const imageFile = InputFile.fromBuffer(image?.get("blobFile") as Blob, image?.get("fileName") as string)
            file = await storage.createFile(process.env.USERIMAGE_BUCKETID!, ID.unique(), imageFile)
        }

        let data

        if (image) {
            data = {
                image: await getFilePreview(file?.$id, USERIMAGE_BUCKETID!),
                ...userInfo
            }
        } else {
            data = {
                ...userInfo
            }
        }


        const update = await databases.updateDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            userId!,
            data
        )

        revalidatePath("/accounts")

        return update
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);

        }
    }
}

export const getUserInfo = async () => {
    const cookieStore = await cookies()
    const userId = cookieStore.get("userId")?.value
    try {
        const { databases } = await createSessionClient(cookieStore.get("session")?.value)
        const userInfo = await databases.listDocuments<UserInfoParams>(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal("$id", userId!)]
        )

        return userInfo.documents[0]
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}

export const saveAdminPasskey = async (passkey: string) => {
    const cookieStore = await cookies()
    cookieStore.set("adminPasskey", passkey)
}

export const adminLogout = async () => {
    const cookieStore = await cookies()
    try {
        await cookieStore.delete("adminPasskey")
    } catch (error) {
        console.log(error)
    }
}

export const logout = async () => {
    const cookieStore = await cookies()
    try {
        await cookieStore.delete("session")
        await cookieStore.delete("userId")
    } catch (error) {
        console.log(error)
    }
}