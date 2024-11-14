// @ts-nocheck
import React from 'react'
import { getUserInfo } from '@/appwrite/user.actions'
import Status from '@/components/Status'
import { Hourglass, ShoppingBasket, User } from 'lucide-react'
import { getUserTransactions } from '@/appwrite/product.actions'
import { getVendor } from '@/appwrite/vendor.actions'
import { cn } from '@/lib/utils'


type Props = {
  user: any;
  transaction: any;
  vendor: any;
};

export async function getServerSideProps(context: any) {
  const [user, transaction, vendor] = await Promise.allSettled([
    getUserInfo(),
    getUserTransactions(),
    getVendor(),
  ]);

  return {
    props: {
      user: user.status === "fulfilled" ? user.value : null,
      transaction: transaction.status === "fulfilled" ? transaction.value : null,
      vendor: vendor.status === "fulfilled" ? vendor.value : null,
    },
  };
}

const DashboardPage = async ({ user, transaction, vendor }: Props) => {

  if (!user || !transaction || !vendor) {
    throw new Error("No internet connection!")
  }


  return (
    <div className='space-y-10'>
      <div>
        {user.status
          === "fulfilled" && <h1 className='text-xl tracking-tighter font-semibold'>Welcome back, {user.value.name.split(" ")[0]}</h1>}
      </div>


      <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">

        <Status
          title='Account Info'
          Icon={User}
          href="/dashboard/profile"
        />


        <Status
          title='Orders'
          count={`${transaction?.value.length}`}
          Icon={ShoppingBasket}
        />

        {vendor!.value.length > 0 && (
          <Status
            title='Application Status'
            Icon={Hourglass}

            // @ts-expect-error
            type={`${vendor!.value[0].status}`}>

            <div className={cn("w-auto px-2 py-1 rounded-full bg-green-100 text-green-500", {
              "bg-amber-100 text-amber-500": vendor!.value[0].status === "processing",
              "bg-red-100 text-red-400": vendor!.value[0].status === "declined"
            })}>{vendor!.value[0].status}</div>
          </Status>
        )}

      </div>

    </div>
  )
}

export default DashboardPage