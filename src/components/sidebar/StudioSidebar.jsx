'use client'

import { Component, Home, HomeIcon, Settings } from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const StudioSidebar = () => {
    const pathName = usePathname()
  

    return (
        <div className="w-full p-4 ">
            <div className="flex flex-col gap-2 w-full ">
                {sidebarItems.map((sidebarItem) => (
                    <Link
                        href={sidebarItem.path}
                        key={sidebarItem.label}
                        className={`flex gap-2 p-4 hover:bg-neutral-900 w-full   ${pathName == sidebarItem.path && "bg-neutral-900 font-bold"} rounded-lg  `}
                    >
                        <span>{sidebarItem.icon}</span>
                        <span>{sidebarItem.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    )
}

const sidebarItems = [
    {
        label: 'Dashboard',
        path: '/studio',
        icon: <Home />,
    },
    {
        label: 'Settings',
        path: '/studio/settings',
        icon: <Settings />,
    },
    {
        label: 'Events',
        path: '/studio/events',
        icon: <Component />,
    },
]

export default StudioSidebar
