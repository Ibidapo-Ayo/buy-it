"use client"
import { deleteCarts } from "@/appwrite/product.actions"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react"


const RemoveCartsDialog = ({ cartId }: {
    cartId: string
}) => {

    const handleCartActions = async (type: "add-to-wishlist" | "remove-from-cart") => {
        if (type === "remove-from-cart") {
            await deleteCarts(cartId)
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger> <Button variant={"ghost"} size={"sm"} className='text-secondary-green-50 font-semibold uppercase hover:bg-secondary-green-60/10 hover:text-secondary-green-50 rounded-md'>
                <Trash className='w-4' />
                <span>Remove</span>
            </Button></AlertDialogTrigger>
            <AlertDialogContent className="bg-white">
                <AlertDialogHeader className="space-y-10">
                    <AlertDialogTitle className="text-secondary-green-50">Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription className="flex flex-col space-y-3">
                        <Button onClick={() => console.log(cartId)} variant={"ghost"} size={"lg"} className="bg-secondary-green-60 hover:bg-secondary-green-50 text-white hover:text-white">Save to Favourites</Button>
                        <Button variant={"ghost"} size={"lg"} onClick={() => handleCartActions("remove-from-cart")} className="bg-red-500 hover:bg-red-600 text-white hover:text-white">Remove</Button>
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel><X /> </AlertDialogCancel>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default RemoveCartsDialog