"use server"

import { becomeVendorFormProps } from "@/types"

const { DATABASE_ID, VENDOR_ID } = process.env

const createVendorAccount = async (data: becomeVendorFormProps) => {
    try {

    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
}