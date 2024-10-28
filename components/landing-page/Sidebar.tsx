"use client"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
    SheetDescription
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import NavbarActions from "./nav/NavbarActions"
import { useState } from "react"


const Sidebar = ({ totalCarts }: {
    totalCarts: number | undefined
}) => {

    const [open, setOpen] = useState(false)

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden block">
                <Menu />
            </SheetTrigger>

            <SheetDescription>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>

                        </SheetTitle>
                    </SheetHeader>
                    <NavbarActions totalCarts={totalCarts} setOpen={setOpen} />
                </SheetContent>
            </SheetDescription>
        </Sheet>

    )
}

export default Sidebar