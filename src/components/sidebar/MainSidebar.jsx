'use client'

import {
    AlertTriangle,
    BarChartBig,
    BrainCircuit,
    CalendarDays,
    CloudDrizzle,
    HandHelping,
    Home,
    LayoutDashboard,
    LogOut,
    Megaphone,
    MessageSquare,
    PencilLine,
    PlusCircle,
    Search,
    Settings,
    Store,
    ThermometerSun,
    Ticket,
    Users,
    Volume2,
} from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const MainSidebar = () => {
    const pathName = usePathname()

    return (
        <div className="w-full p-4 flex fixed">
            <div className="flex flex-col gap-3 w-full">
                {sidebarItems.map((sidebarItem) => (
                    <Link
                        href={sidebarItem.href}
                        key={sidebarItem.label}
                        className={`flex gap-4 px-2 py-2  hover:bg-white/10  w-full   ${pathName == sidebarItem.path && 'bg-neutral-900 font-bold'} rounded-lg text-md  `}
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
    { label: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard /> },
    { label: 'Events', href: '/admin/events', icon: <CalendarDays /> },
    {
        label: 'Create Event',
        href: '/admin/create-event',
        icon: <PlusCircle />,
    },
    { label: 'Settings', href: '/admin/settings', icon: <Settings /> },
    { label: 'Logout', href: '/logout', icon: <LogOut /> },
]

export default MainSidebar
