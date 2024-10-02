import { cartItemsProps } from "@/constants/data/products"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const calculateProductPercentage = (price: number, strikedPrice: number): number => {
  const discountedPrice = ((strikedPrice - price) / strikedPrice) * 100
  return parseFloat(discountedPrice.toFixed(0))
}

export const calculateTotalCartItems = (arr: cartItemsProps[]) => {
  return `$ ${arr.reduce((acc, cart) => {
    return acc + (cart.quantity * cart.price)
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