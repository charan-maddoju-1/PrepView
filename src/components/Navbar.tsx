import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className='root-layout'>
      <nav>
        <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" width={38} height={32} alt={''} />
        </Link>
      </nav>
    </div>
  )
}
export default Navbar
