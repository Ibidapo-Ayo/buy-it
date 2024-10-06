"use client"
import { getCart } from "@/appwrite/product.actions"
import { ProductsProps } from "@/types"
import React, { createContext, useContext, useEffect, useReducer } from "react"

type ContextProps = State & {
    dispatch: React.Dispatch<ActionType<Actions, any>>
}

// @ts-expect-error
export const ProuductContext = createContext<ContextProps>()

type ActionType<T = string, P = any> = {
    type: T
    payload?: P
}

type Actions = "add-to-cart" | "update" | "create" | "get-carts"

type Cart = {
    product: ProductsProps,
    user: {
        accountId?: string,
        name?: string
    },
    quantity: number
}

type State = {
    carts?: Cart[],
    totalCarts?: number
}

const initialState: State = {
    carts: [],
    totalCarts: 0
}

function reducer(state: State, action: ActionType<Actions, any>) {
    const { type, payload } = action

    switch (type) {
        case "add-to-cart":
            return { ...state, carts: payload, totalCarts: payload?.length }
        case "get-carts":
            return { ...state, carts: payload, totalCarts: payload.length }
        default:
            return state
    }
}

const ProductProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        const fetchData = async () => {
            const result = await getCart()
            dispatch({ type: "get-carts", payload: result })
        }
        fetchData()
    }, [])

    return (
        <ProuductContext.Provider value={{ ...state, dispatch }}>
            {children}
        </ProuductContext.Provider>
    )
}

const useProducts = () => {
    const context = useContext(ProuductContext)

    if (context === undefined) {
        throw new Error("products context must be used within its provider")
    }

    return context
}

export { ProductProvider, useProducts }

