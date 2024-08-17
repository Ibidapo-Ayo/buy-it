import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import NavbarActions from "./components/NavbarActions"


const Sidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden block">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <NavbarActions />
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default Sidebar