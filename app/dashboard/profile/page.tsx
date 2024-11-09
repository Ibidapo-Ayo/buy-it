import React from 'react'
import AccountInfoForm from '@/components/forms/AccountInfoForm'
import { getUserInfo } from '@/appwrite/user.actions'


const AccountPage = async () => {
  const userInfo = await getUserInfo()

  if (!userInfo) {
    throw new Error("An error occured, please try again ")
  }
  return (
    <div className='space-y-5 pr-0 px-5 md:pr-20 lg:pr-24 xl:pr-60'>
      <div>

        <h1 className='text-xl tracking-tighter font-semibold'>Edit your profile</h1>
        <p className='text-sm text-secondary'>You can edit your profile details here</p>
      </div>

      <AccountInfoForm userInfo={userInfo} />
    </div>
  )
}

export default AccountPage