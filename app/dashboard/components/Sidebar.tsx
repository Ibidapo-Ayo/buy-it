
"use client"
import Link from "next/link"
import {
    Home,
    LogOut,
    Plus,
    ShoppingBasket,
    ShoppingBag,
    User,
    Blocks
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { decryptKey } from "@/lib/utils"

const navLinks = [
    {
        name: "Dashboard",
        href: "/dashboard",
        Icon: Home
    },
    {
        name: "Create Product",
        href: "/dashboard/products/create",
        Icon: Plus
    },
    {
        name: "Profile",
        href: "/dashboard/profile",
        Icon: User
    },
    {
        name: "Manage Products",
        href: "/dashboard/products/manage",
        Icon: ShoppingBag
    }
]


export default function Sidebar() {
    return (
        <div className="">
            <aside className="fixed inset-y-0 left-0 z-10 w-62 border-r bg-background py-5 px-5">
                <SideBarLinks />
            </aside>

        </div>
    )
}


export const SideBarLinks = () => {
    const router = useRouter()

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    useEffect(() => {
        const passKey = Cookies.get('adminPasskey');
        setIsAdmin(decryptKey(passKey!) === process.env.NEXT_PUBLIC_ADMIN_PIN);
    }, []);

    const handleLogoutAdmin = async () => {
        router.push("/logout")
    }
    return (
        <div className="flex flex-col justify-between h-full space-y-1">
            <div className="w-full flex">
                <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-10 md:w-14 ' />
            </div>
            <nav className="flex flex-col gap-7 px-2 space-y-3">
                {navLinks.map((link, index) => {
                    return (
                        <Link
                            key={index}
                            href={`${link.href}`}
                            className="flex rounded-lg text-muted-foreground transition-colors hover:text-foreground space-x-2 items-center"
                        >

                            <link.Icon className="w-5" />
                            <span className="text-sm">{link.name}</span>
                        </Link>
                    )
                })}
            </nav>
            <nav className="mt-auto flex flex-col gap-4 py-5 px-5 justify-end">

                {isAdmin && (
                    <Link
                        href="/manage/vendors"
                        className="flex rounded-lg text-muted-foreground transition-colors hover:text-foreground space-x-4"
                    >
                        <Blocks className="h-5 w-5" />
                        <span className="">Manage Vendors</span>
                    </Link>
                )}

                <Button variant={"ghost"} className="bg-red-500 hover:bg-red-600 space-x-2 text-left" onClick={handleLogoutAdmin}>
                    <LogOut className="text-white" />
                    <span className="text-white">Logout</span>
                </Button>
            </nav>
        </div>
    )
}
