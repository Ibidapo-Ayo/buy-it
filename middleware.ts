"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptKey } from "./lib/utils";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()

    const user = cookieStore.get("userId")?.value
    const isVendor = cookieStore.get("vendorId")?.value
    const isAdmin = decryptKey(cookieStore.get("adminPasskey")?.value!) === process.env.NEXT_PUBLIC_ADMIN_PIN

    if (user && (request.url.includes("/login") || request.url.includes("/register"))) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!user && (request.url.includes("/accounts"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (!user && (request.url.includes("/dashboard"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    } 
    if(isVendor && (request.url.includes("vendor"))){
        return NextResponse.redirect(new URL("/accounts", request.url))
    }

    if (!user && (request.url.includes("/checkout"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/cart", "/login", "/register", "/dashboard", "/accounts", "/checkout", "/become-vendor"]
}

// const auth = {
//     user: undefined,
//     sessionCookie: undefined,
//     getUser: async () => {
//         const cookieStore = await cookies()
//         // @ts-expect-error
//         auth.sessionCookie = cookieStore.get("session");
//         try {
//             // @ts-expect-error
//             const { account } = await createSessionClient(auth.sessionCookie!.value)
//             // @ts-expect-error
//             auth.user = await account.get()

//             return auth.user

//         } catch (error) {
//             console.log(error)
//             auth.user = undefined
//             auth.sessionCookie = undefined
//         }
//     },
// }

