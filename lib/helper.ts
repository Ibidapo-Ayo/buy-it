"use server"

import { cookies } from "next/headers"

export const userIsAuthorized = async () => {
    const cookieStore = await cookies()

    const isAdmin = cookieStore.get("isAdmin")
    const isVendor = cookieStore.get("vendorId")

    if (isAdmin || isVendor) {
        return true
    }

    return false
}