"use client"

import { passwordRegex } from "@/lib/utils"
import { z } from "zod"

export const newsLetterSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address"
  }),
})

export const registerFormSchema = z.object({
  username: z.string().min(5, {
    message: "You must enter a username"
  }),
  email: z.string().email({
    message: "Enter a valid email address"
  }),
  password: z.string().min(6, {
    message: "Enter minimun of 6 character"
  }).max(16, {
    message: "Password must not be more than 16 character"
  }).regex(passwordRegex, {
    message: "Password must contain atleast a lowercase letter, uppercase, number and special characters"
  })
})

export const loginFormSchema = z.object({
  email: z.string().email({
    message: "Enter a valid email address"
  }),
  password: z.string().min(6, {
    message: "Password must contain at least 6 character(s)"
  })
})


export const productFormSchema = z.object({
  name: z.string({
    message: "Product name is required"
  }).min(1, {
    message: "Product name is required"
  }),
  image: z.custom<File[]>().optional(),
  description: z.string({
    message: "Product description is required"
  }),
  price: z.string({
    message: "Product Price is required"
  }).min(1, {
    message: "Price is required"
  }),
  strikedPrice: z.string().optional(),
  availableProducts: z.string().optional(),
  totalProducts: z.string().optional(),
  offer: z.string().optional(),
  rating: z.string().optional(),
  comments: z.string().optional(),
  hasOffer: z.boolean().optional(),
  category: z.string().optional()
})

export const accountInfoFormSchema = z.object({
  name: z.string({
    message: "Username is required"
  }).min(1, {
    message: "Username is required"
  }),

  bio: z.string().optional(),
  image: z.custom<File[]>().optional(),
  address: z.string().optional(),
  phone_number: z.string().optional()
})

export const checkoutFormSchema = z.object({
  paymentMethod: z.string({
    message: "Payment method is required"
  }),
  shippingAddress: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  cardNumber: z.string({
    message: "cardNumber is required (1234, 5678, 9101, 3456)"
  }).min(1, {
    message: "Incorrect card number"
  }).max(20, {
    message: "More the required card number"
  }),
  cardExpiration: z.string({
    message: "Card expiration is required (Any value can be inputed here)"
  }),
  cardSecurityCode: z.string({
    message: "Card security is required"
  }).max(3, {
    message: "Card security code must not be more than 3 value"
  }),
  first_name: z.string({
    message: "First name is required"
  }).trim(),
  last_name: z.string({
    message: "Last name is required"
  }).trim(),
  email: z.string({
    message: "Email is required"
  }).email({
    message: "Invalid email address"
  }),
  phone_number: z.string().optional()

});