
"use client"
import Link from "next/link"
import {
    Home,
    LogOut,
    Plus,
    Settings,
    ShoppingBasket,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { logout } from "@/appwrite/user.actions"
import { useRouter } from "next/navigation"

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
        name: "Manage Orders",
        href: "/dashboard/orders",
        Icon: ShoppingBasket
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

    const handleLogoutAdmin = async () => {
        await logout()
        router.push("/admin/access")
    }
    return (
        <div className="flex flex-col justify-between h-full">
            <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-24 md:w-28 mb-5' />
            <nav className="flex flex-col gap-7 px-2 sm:py-5 space-y-3">
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
                <Link
                    href="/settings"
                    className="flex rounded-lg text-muted-foreground transition-colors hover:text-foreground space-x-4"
                >
                    <Settings className="h-5 w-5" />
                    <span className="">Settings</span>
                </Link>

                <Button variant={"ghost"} className="bg-red-500 hover:bg-red-600 space-x-2 text-left" onClick={handleLogoutAdmin}>
                    <LogOut className="text-white" />
                    <span className="text-white">Logout</span>
                </Button>
            </nav>
        </div>
    )
}
