"use server"
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decryptKey } from "./lib/utils";

export async function middleware(request: NextRequest) {
    const cookieStore = await cookies()

    const user = cookieStore.get("userId")?.value
    const isAdmin = decryptKey(cookieStore.get("adminPasskey")?.value!) === process.env.NEXT_PUBLIC_ADMIN_PIN

    if (user && (request.url.includes("/login") || request.url.includes("/register"))) {
        return NextResponse.redirect(new URL("/", request.url))
    }

    if (!user && (request.url.includes("/accounts"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    if (!isAdmin && (request.url.includes("/dashboard"))) {
        return NextResponse.redirect(new URL("/admin/access", request.url))
    } else if (isAdmin && (request.url.includes("access"))) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
    }

    if (!user && (request.url.includes("/checkout"))) {
        return NextResponse.redirect(new URL("/login", request.url))
    }


    return NextResponse.next();
}

export const config = {
    matcher: ["/", "/cart", "/login", "/register", "/dashboard", "/admin/access", "/accounts", "/checkout"]
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

