"use client"
import { useProducts } from "@/app/context/product-context"
import { deleteCarts } from "@/appwrite/product.actions"
import SubmitButton from "@/components/SubmitButton"
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Trash, X } from "lucide-react"
import { useState } from "react"



type RemoveCartsDialogProps = {
    cartId: string
}


const RemoveCartsDialog = ({ cartId }: RemoveCartsDialogProps) => {

    const { carts, dispatch } = useProducts()
    const [open, setOpen] = useState(false);

    const [isLoading, setIsLoading] = useState(false);



    const handleCartActions = async (type: "add-to-wishlist" | "remove-from-cart") => {

        setIsLoading(true)

        if (type === "remove-from-cart") {

            try {
                await deleteCarts(cartId)
                const deletedCarts = carts?.filter((cart) => cart.$id !== cartId)
                dispatch({
                    type: "update", payload: {
                        carts: deletedCarts
                    }
                })
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            } finally {
                setIsLoading(false)
                setOpen(false)
            }
        }
    }
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>

            <AlertDialogTrigger className='text-secondary-green-50 font-semibold uppercase hover:bg-secondary-green-60/10 hover:text-secondary-green-50 rounded-md flex space-x-3 px-3 py-2'>
                <Trash className='w-4' />
                <span>Remove</span>
            </AlertDialogTrigger>

            <AlertDialogContent className="bg-white">
                <AlertDialogTitle className="flex items-start justify-between">Are you absolutely sure?
                    <X onClick={() => setOpen(false)} className="w-4" />
                </AlertDialogTitle>
                <AlertDialogHeader className="space-y-10">
                    <div className="flex flex-col space-y-3">
                        
                        <SubmitButton disabled={isLoading} onClick={() => console.log(cartId)} className="bg-secondary-green-60 hover:bg-secondary-green-50 text-white hover:text-white">Save to Favourites</SubmitButton>

                        <SubmitButton disabled={isLoading} onClick={() => handleCartActions("remove-from-cart")} className="bg-red-500 hover:bg-red-600 text-white hover:text-white">Remove</SubmitButton>

                    </div>
                </AlertDialogHeader>
            </AlertDialogContent>
        </AlertDialog>

    )
}

export default RemoveCartsDialog