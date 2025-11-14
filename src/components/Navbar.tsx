import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav>
      <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" width={38} height={32} alt={''} />
          <span className='font-bold text-3xl'> PrepView </span>
      </Link>
      
    </nav>
  )
}
export default Navbar
