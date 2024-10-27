import React from 'react'
import AccountInfoForm from '@/components/forms/AccountInfoForm'
import { getUserInfo } from '@/appwrite/user.actions'


const AccountPage = async() => {
  const userInfo = await getUserInfo()  
  return (
    <div className='w-full md:px-40 px-5'>
        <AccountInfoForm userInfo={userInfo} />
      </div>
  )
}

export default AccountPage