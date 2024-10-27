"use client"
import { updateUserInfo } from '@/appwrite/user.actions'
import { FileUploaderProps } from '@/components/FileUploader'
import { Button } from '@/components/ui/button'
import { convertFileToUrl } from '@/lib/utils'
import { ImageIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

const ProfileUploader = ({ files, onChange, image }: FileUploaderProps) => {
  const [hoverImage, setHoverImage] = useState(false)
  const [profileImage, setProfileImage] = useState(image || "/images/users.png")

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const file: File[] | FileList | null = e.target.files
    if (file) {

      // @ts-ignore
      onChange(file)
      setProfileImage(convertFileToUrl(file[0]))
    }
  }

  const openFileInput = () => {
    document.getElementById("fileInput")?.click()
  }

  return (
    <div className='space-y-3 flex flex-col justify-center items-center'>
      <div className='w-20 h-20 rounded-full relative overflow-hidden group'
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        <Image src={`${profileImage}`} alt='' width={100} height={100} className='w-full h-full rounded-full ' />
        <input
          type="file"
          id="fileInput"
          className='hidden'
          onChange={handleFileUpload}
        />

        {
          hoverImage && (
            <div className='absolute w-full h-full rounded-full inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity'>
              <Button className="bg-transparent hover:bg-transparent" onClick={openFileInput} type='button'>
                <ImageIcon className='w-4 text-secondary-green-60' />
              </Button>
            </div>

          )
        }

      </div>
      <div className='space-y-0 flex flex-col items-center'>
        <div className='flex space-x-2 items-center'>
          <h3 className='font-semibold text-sm'>Ayomide Ibidapo</h3>
        </div>
        <Button className='hover:bg-transparent disabled:cursor-not-allowed' variant={"ghost"} disabled>
          <p className='text-secondary text-sm'>ayomideibidapo76@gmail.com</p>
        </Button>
      </div>
    </div>
  )
}

export default ProfileUploader