"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "./appwrite/config";
import { decryptKey } from "./lib/utils";

export async function middleware(request: NextRequest) {
    const user = await auth.getUser()
    const cookieStore = await cookies()

    const response = NextResponse.next();
    const isAdmin = decryptKey(cookieStore.get("adminPasskey")?.value!) === process.env.ADMIN_PIN

    if (user && (request.url.includes("/login") || request.url.includes("/register"))) {
        const response = NextResponse.redirect(new URL("/", request.url))
        return response
    }

    if (!isAdmin && (request.url.includes("/dashboard"))) {
        return NextResponse.redirect(new URL("/admin/access", request.url))
    } else if (isAdmin && (request.url.includes("access"))) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    return response;
}

export const config = {
    matcher: ["/", "/cart", "/login", "/register", "/dashboard", "/admin/access"]
}

const auth = {
    user: undefined,
    sessionCookie: undefined,
    getUser: async () => {
        const cookieStore = await cookies()
        // @ts-expect-error
        auth.sessionCookie = cookieStore.get("session");
        try {
            // @ts-expect-error
            const { account } = await createSessionClient(auth.sessionCookie!.value)
            // @ts-expect-error
            auth.user = await account.get()

            return auth.user

        } catch (error) {
            console.log(error)
            auth.user = undefined
            auth.sessionCookie = undefined
        }
    },
}

