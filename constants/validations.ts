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