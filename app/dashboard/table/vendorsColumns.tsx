"use client"
import { cn } from "@/lib/utils"
import { becomeVendorFormProps } from "@/types"
import { ColumnDef } from "@tanstack/react-table"
import EditVendorApplication from "../components/EditVendorApplication"


export const vendorsColumns: ColumnDef<becomeVendorFormProps>[] = [
    {
        accessorKey: "shopName",
        header: "Shop name",
    },
    {
        accessorKey: "country",
        header: "Vendor's Country",
    },
    {
        accessorKey: "shippingZone",
        header: "Vendor's Shipping Zone",
    },
    {
        accessorKey: "status",
        header: "Vendor's Application Status",
        cell: ({ row }) => {
            return (
               <div className="w-full flex justify-center">
                 <div className={cn("w-24 text-center px-2 py-1 rounded-full bg-green-100 text-green-500", {
                    "bg-amber-100 text-amber-500": row.original.status === "processing",
                    "bg-red-100 text-red-400": row.original.status === "declined"
                })}>{row.original.status}</div>
               </div>
            )
        }
    },
    {
        id: "actions",
        header: () => <div className="pl-4">Actions</div>,
        cell: ({ row }) => {
            return (
               <EditVendorApplication type={row.original.status} id={row.original.$id} />
            )
        },
    },
]