import * as React from "react"
import PopularItemsCard from "../PopularItemsCard"
import { productCategory } from "@/constants/data/category"


export function PopularItems() {
  return (
    <div className="space-y-3 md:block hidden">
      <h2 className="font-semibold text-xl tracking-tighter">Shop by category</h2>
      <div className="grid grid-cols-9 gap-4">
        {productCategory.slice(0, 9).map((item, index) => (
          <PopularItemsCard key={index} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  )
}
