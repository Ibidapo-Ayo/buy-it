import React from 'react'
import { getUserInfo } from '@/appwrite/user.actions'
import Status from '@/components/Status'
import { ShoppingBasket } from 'lucide-react'

const DashboardPage = async () => {
  const user = await getUserInfo()
  return (
    <div className='space-y-10'>
      <div>

        {user && <h1 className='text-xl tracking-tighter font-semibold'>Welcome back, {user!.name.split(" ")[0]}</h1>}
        {user?.bio && <p className='text-sm text-secondary'>You are {user?.bio}</p>}
      </div>


      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2">

        <Status
          title='Orders'
          count="20"
          Icon={ShoppingBasket}
        />
      </div>



    </div>
  )
}

export default DashboardPage