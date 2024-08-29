import React from 'react'
import Help from './help'
import FooterLinks from './links'
import Socials from './socials'

const Links = () => {
  return (
    <div className='w-full grid grid-cols-[auto,1fr,auto] gap-2 pt-20'>
        <Help />
        <FooterLinks />
        <Socials />
    </div>
  )
}

export default Links