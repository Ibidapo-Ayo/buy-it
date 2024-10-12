import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import NavbarActions from "./nav/NavbarActions"


const Sidebar = ({ totalCarts }: {
    totalCarts: number | undefined
}) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden block">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <NavbarActions totalCarts={totalCarts} />
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default Sidebar