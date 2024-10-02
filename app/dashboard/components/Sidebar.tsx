
import Link from "next/link"
import {
    Home,
    Plus,
    Settings,
} from "lucide-react"
import Image from "next/image"

export default function Sidebar() {
    const navLinks = [
        {
            name: "Dashboard",
            href: "/dashboard",
            Icon: Home
        },
        {
            name: "Create Product",
            href: "/dashboard/create",
            Icon: Plus
        }
    ]
    return (
        <div className="">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-62 flex-col border-r bg-background sm:flex py-5 px-5">
                <Image src="/images/logo.png" alt="alt" width={1000} height={1000} className='w-24 md:w-28 mb-5' />
                <nav className="flex flex-col gap-4 px-2 sm:py-5 space-y-3">
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
                <nav className="mt-auto flex flex-col gap-4 sm:py-5 px-5 ">
                    <Link
                        href="/settings"
                        className="flex rounded-lg text-muted-foreground transition-colors hover:text-foreground space-x-4"
                    >
                        <Settings className="h-5 w-5" />
                        <span className="">Settings</span>
                    </Link>
                </nav>
            </aside>

        </div>
    )
}
