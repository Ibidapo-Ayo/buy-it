"use client"
import { getCart } from "@/appwrite/product.actions"
import { Actions, ActionType, ContextProps, State } from "@/types"
import Image from "next/image"
import React, { createContext, useContext, useEffect, useReducer, useState } from "react"


// @ts-expect-error
export const ProuductContext = createContext<ContextProps>()

const initialState: State = {
    carts: [],
    totalCarts: 0,
}

function reducer(state: State, action: ActionType<Actions, any>) {
    const { type, payload } = action

    switch (type) {
        case "add-to-cart":
            return { ...state, carts: payload?.carts, totalCarts: payload?.carts?.length || 0 }
        case "get-carts":
            return { ...state, carts: payload?.carts, totalCarts: payload?.carts?.length || 0 }
        case "update":
            return { ...state, carts: payload.carts, totalCarts: payload?.carts?.length  }
        default:
            return state
    }
}

const ProductProvider = ({ children }: React.PropsWithChildren) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getCart()
                dispatch({
                    type: "get-carts", payload: {
                        carts: result,
                    }
                })

            } catch (error) {
                if (error instanceof Error) {
                    console.log("An error occured", error.message);
                }

                throw new Error("An error occured while fetching")
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    return (
        <ProuductContext.Provider value={{ ...state, dispatch }}>
            {isLoading ? (
                <div className="w-full flex justify-center items-center h-screen">
                    <Image src={"/icons/spinner.svg"} alt="" className="w-16" width={100} height={100} />
                </div>
            ) : (children)}
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

