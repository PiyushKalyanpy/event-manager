'use client'

import { Home, Signal, TicketsIcon, UserRound } from 'lucide-react'
import React, { useState } from 'react'

const NavBar = ({
    selectedItem,
    setSelectedItem,
}: {
    selectedItem: any
    setSelectedItem: any
}) => {
    const navOptions = [
        {
            id : 0,
            name: 'Home',
            href: '/u',
            icon: <Home />,
        },
        {
            id : 1,
            name: 'Tickets',
            href: '/u/tickets',
            icon: <TicketsIcon />,
        },
        {

            id : 2,
            name: 'SOS',
            href: '/u/sos',
            icon: <Signal />,
        },
        {
            id : 3,
            name: 'Profile',
            href: '/u/profile',
            icon: <UserRound />,
        },
    ]

 
    return (
        <div className=" p-4 flex h-fit justify-between border-t-1 bg-neutral-900 w-full">
            {navOptions.map((option) => (
                <div
                    key={option.name}
                    onClick={() => setSelectedItem(option.id)}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl   font-bold 
                        ${selectedItem === option.id ? 'text-white bg-green-600' : 'text-white  hover:text-green-600'}`}
                >
                    {option.icon}
                    <p className='text-sm'>{option.name}</p>
                </div>
            ))}
        </div>
    )
}

export default NavBar
