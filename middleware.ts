import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createSessionClient } from "./appwrite/config";

export async function middleware(request: NextRequest) {
    const user = await auth.getUser()

    if (user && (request.url.includes("/login") || request.url.includes("/register"))) {
        const response = NextResponse.redirect(new URL("/", request.url))
        return response
    }
    return NextResponse.next()
}

export const config = {
    matcher: ["/", "/cart", "/login", "/register"]
}

const auth = {
    user: undefined,
    sessionCookie: undefined,
    getUser: async () => {
        // @ts-expect-error
        auth.sessionCookie = cookies().get("session");
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