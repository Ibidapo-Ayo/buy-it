import React from 'react'
import Help from './help'
import FooterLinks from './links'
import Socials from './socials'

const Links = () => {
  return (
    <div className='w-full flex flex-col-reverse md:flex-row md:space-y-0 space-y-5 gap-2 pt-20'>
        <Help />
        <FooterLinks />
        <Socials />
    </div>
  )
}

export default Links