import React from 'react'
import AccountInfoForm from '@/components/forms/AccountInfoForm'
import { getUserInfo } from '@/appwrite/user.actions'


const AccountPage = async () => {
  const userInfo = await getUserInfo()

  if (!userInfo) {
    throw new Error("An error occured, please try again ")
  }
  return (
    <div className='w-full md:px-40'>
      <AccountInfoForm userInfo={userInfo} />
    </div>
  )
}

export default AccountPage