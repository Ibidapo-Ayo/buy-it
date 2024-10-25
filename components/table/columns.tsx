"use client"

import EditProductsModal from "@/app/dashboard/components/EditProductsModal"
import { ProductsProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"


export const columns: ColumnDef<ProductsProps>[] = [
    {
        accessorKey: "productImageUrl",
        header: "Product Image",
        cell: ({ row }) => {
            return (
                <div className="w-20 h-20">
                    <Image src={`${row.original.productImageUrl}`} alt="" width={100} height={1000} className="w-full h-full object-cover" />
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: "Product name",
    },
    {
        accessorKey: "price",
        header: "Product price",
    },
    {
        accessorKey: "category",
        header: "Category",
    },

    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            return (
                <EditProductsModal type="Update" data={row.original} />
            )
        },
    },
]
