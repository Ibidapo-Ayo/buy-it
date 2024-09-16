"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { products as Products, ProductTypes } from '@/constants/data/products'
import { Search, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

const SearchComponet = () => {
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const [searchValue, setSearchValue] = useState("")

    const [searchResult, setSearchResult] = useState<ProductTypes>([])
    const keyUpTimer = useRef(null)
                

    const handleKeyUpTimer = () => {
        setIsSearching(true)

        if (keyUpTimer.current) {
            clearTimeout(keyUpTimer.current)
        }

        keyUpTimer.current = setTimeout(() => {
            const products = Products.filter((product) => product.name.toLowerCase().includes(searchValue.toLowerCase()))
            setSearchResult(products)
            setIsSearching(false)
        }, 2000)
    }

    return (
        <div className='w-full px-3 py-3 h-12 rounded-t-md bg-secondary-100 flex items-center relative'>
            <Input className='px-0 py-0 h-full border-none rounded-md focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent focus:outline-none' placeholder='Search for products, categories or brands...'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyUp={handleKeyUpTimer}
            />
            {searchValue && (
                <Button variant={"ghost"} size={"icon"} onClick={() => setSearchValue("")}>
                    <X className='md:w-6 w-4' />
                </Button>
            )}


            {searchValue && (
                <div className='absolute w-full h-72 top-14 rounded-b-md bg-secondary-100 left-0 z-[100] p-2'>
                    {isSearching && (
                        <div className='w-full h-full flex justify-center items-center'>
                            <Image src={"/icons/loader.svg"} alt='Loader' width={40} height={40} />
                        </div>
                    )}

                    {!isSearching && (
                        searchResult.length > 0 ? (
                            <div className='w-full h-52 space-y-5'>
                                <h3 className='text-md font-semibold tracking-tight'>{searchResult.length} items found</h3>
                                <div className='w-full h-full overflow-y-auto space-y-2'>
                                    {searchResult.map((result, index) => {
                                        return (
                                            <div className='grid grid-cols-[auto,1fr] gap-5' key={index}>
                                                <Image src={result.images[0]} alt={result.name + "image"} className='rounded-md' width={50} height={50} />
                                                <Link href={result.path}>
                                                    <div className='flex flex-col space-y-2'>
                                                        <h3 className='text-sm tracking-tight font-semibold'>{result.name}</h3>
                                                        <p className='text-sm text-secondary-200'></p>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className='w-full h-full flex justify-center items-center'>
                                <p className='text-secondary-200 text-sm'>No result for this search</p>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchComponet