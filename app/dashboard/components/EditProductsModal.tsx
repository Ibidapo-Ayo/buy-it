"use client"
import AddProductForm from '@/components/forms/AddProductForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogOverlay,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ProductsProps } from '@/types';

import { Edit, Trash } from 'lucide-react';
import React, { useState } from 'react'

type EditProductsModalProps = {
    type?: string,
    data: ProductsProps
}

const EditProductsModal = ({ type, data }: EditProductsModalProps) => {
    const [open, setOpen] = useState(false);
    
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='w-full flex justify-center items-center gap-5'>
                <Edit className='w-4 text-secondary-green-50' />
                <Trash className='w-4 text-red-500' />
            </DialogTrigger>
            <DialogOverlay className="overflow-y-auto fixed top-0 left-0 bg-black/5">
                <DialogContent className="sm:max-w-md h-3/4 overflow-y-auto">
                    <DialogHeader className="mb-4 space-y-3">
                        <DialogTitle className="capitalize"> {type} Product</DialogTitle>
                        <DialogDescription>
                            Please fill in the following details to {type} an product
                        </DialogDescription>
                    </DialogHeader>


                    <AddProductForm type='update' data={data} setOpen={setOpen} />
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}

export default EditProductsModal