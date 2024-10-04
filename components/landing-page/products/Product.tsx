import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import ItemsCard from '@/components/ItemsCard'
import { getFilePreview, getProducts } from '@/appwrite/product.actions'

const Product = async () => {
  const products = await getProducts()
  return (
    <div className='space-y-4'>
      <div className='w-full flex justify-between items-center'>
        <div className='w-1/2 flex md:flex-row flex-col space-x-0 items-start md:space-x-3 md:items-center'>
          <h2 className="font-semibold text-md md:text-xl tracking-tighter uppercase">New Products</h2>
          <p className='text-secondary-200 text-xs md:text-sm'>Some of the new products arriving this weeks</p>
        </div>
        <div>
          <Button className='rounded-full border hover:bg-transparent border-secondary-200' variant={"ghost"}>
            <Link href={"/products"} className='flex items-center space-x-5 font-semibold'>View All
              <ArrowRight className='w-4' />
            </Link>
          </Button>
        </div>
      </div>

      <div className=''>
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-full"
        >
          <CarouselContent>
            {products!.map((product, index) => {
              const { name, productImageUrl, price, strikedPrice, availableProducts, totalProducts, $id } = product
              return (
                <CarouselItem key={index} className="basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/5">
                  <ItemsCard
                    title={name}
                    image={productImageUrl}
                    price={price}
                    striked_price={strikedPrice}
                    availableItems={availableProducts}
                    totalItems={totalProducts}
                    productId={$id}
                  />
                </CarouselItem>
              )
            })}
          </CarouselContent>
          <CarouselPrevious className='' />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}

export default Product