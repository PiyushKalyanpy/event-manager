'use client'

import { Avatar, Button } from '@heroui/react'

import AvatarDropdown from './AvatarDropdown'
import Link from 'next/link'

const Header = () => {
    return (
        <div className="flex justify-between max-w-screen p-4   items-center  bg-white">
            <h1 className="text-2xl cursor-pointer ">
                <Link href={'/'}>Smart Events</Link>
            </h1>
            <nav className="hidden md:flex  gap-4   ">
                <Link href={'/'}>Home</Link>
                <Link href={'/events'}>Events</Link>
                <Link href={'/about'}>About</Link>
            </nav>
            <AvatarDropdown />
        </div>
    )
}

export default Header
