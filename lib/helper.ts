"use server"

import { cookies } from "next/headers"
import { decryptKey } from "./utils"

export const userIsAuthorized = async () => {
    const cookieStore = await cookies()

    const isAdmin = cookieStore.get("isAdmin")
    const isVendor = cookieStore.get("vendorId")

    if (isAdmin || isVendor) {
        return true
    }

    return false
}

export const userIsAdmin = async () => {
    const cookieStore = await cookies()

    const isAdmin =  decryptKey(cookieStore.get("adminPasskey")?.value!) === process.env.NEXT_PUBLIC_ADMIN_PIN

    if (isAdmin) {
        return true
    }

    return false
}