import { updateCarts } from "@/appwrite/product.actions"
import { cartItemsProps } from "@/constants/data/products"
import { Cart } from "@/types"
import { type ClassValue, clsx } from "clsx"
import { revalidatePath } from "next/cache"
import { Models } from "node-appwrite"
import { Dispatch, SetStateAction } from "react"
import { toast } from "sonner"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateProductPercentage = (price: number, strikedPrice: number): number => {
  const discountedPrice = ((strikedPrice - price) / strikedPrice) * 100
  return parseFloat(discountedPrice.toFixed(0))
}

export const calculateTotalCartItems = (arr: Cart[] | undefined | Models.Document[]) => {
  return `$ ${arr?.reduce((acc, cart) => {
    return acc + (cart.quantity * cart.product.price)
  }, 0).toFixed(2)}`
}

export const checkItemStatus = (availableItems: number, totalItems: number): string | null => {
  const ratio = (availableItems / totalItems) * 100;
  const itemsRemaining = totalItems - availableItems

  if (ratio <= 25) {
    return "This item is about to run out";
  }
  return `${itemsRemaining} items left`;
};

export const generateProductLink = (name: string): string => {
  const link = name.split(" ").join("-").toLowerCase()
  return link
}


export function encryptKey(passkey: string): string {
  return btoa(passkey);
}

export function decryptKey(passkey: string): string {
  return atob(passkey);
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)


export const bodyParser = (value: string) => {
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}

export enum FormFieldTypes {
  INPUT = "input",
  CHECKBOX = "checkbox",
  TEXTAREA = "textarea",
  DATE_PICKER = "datePicker",
  SELECT = "select",
  SKELETON = "skeleton",
  PHONE_INPUT = "phoneInput"
}

export const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


export const handleUpdateQuantity = async (cartId: string, quantity: number, type: "add" | "minus", buttonClickRef: any, setCartQuantity: Dispatch<SetStateAction<number | undefined>>) => {
  try {
    let q = quantity
    if (type === "add") {
      q = quantity + 1
    }

    if (type === "minus") {
      q = quantity <= 0 ? 0 : quantity - 1
    }


    setCartQuantity(q)


    if (buttonClickRef.current) {
      clearTimeout(buttonClickRef.current)
    }

    buttonClickRef.current = setTimeout(async () => {
      try {
        const result = await updateCarts(cartId, q)
        toast.success("Updated successfully ")
      } catch (error) {
        if (error instanceof Error) {
          console.log(error.message);
        }
      }
    }, 2000)


  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}