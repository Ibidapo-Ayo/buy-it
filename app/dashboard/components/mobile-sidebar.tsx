import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import  { SideBarLinks } from "./Sidebar"


const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden block">
                <Menu />
            </SheetTrigger>
            <SheetContent>
                <SheetTitle></SheetTitle>
                <SheetHeader>
                   <SideBarLinks />
                </SheetHeader>
            </SheetContent>
        </Sheet>

    )
}

export default MobileSidebar