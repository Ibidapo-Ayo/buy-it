import * as React from "react"
import PopularItemsCard from "../PopularItemsCard"
import { productCategory } from "@/constants/data/category"


export function PopularItems() {
  return (
    <div className="space-y-3 px-5 ">
      <h2 className="font-semibold text-xl tracking-tighter">Shop by category</h2>
      <div className="flex md:grid md:grid-cols-9 gap-6 md:gap-4 overflow-x-auto w-full">
        {productCategory.slice(0, 9).map((item, index) => (
          <PopularItemsCard key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  )
}
