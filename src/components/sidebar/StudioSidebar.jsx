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
    Trash,
    Users,
    Volume2,
} from 'lucide-react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const StudioSidebar = () => {
    const pathName = usePathname()

    return (
        <div className="w-full p-4 flex ">
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
    {
        label: 'Dashboard',
        href: '/studio/dashboard',
        icon: <LayoutDashboard />,
    },

    {
        label: 'Edit Event',
        href: '/studio/edit-event',
        icon: <PencilLine />,
    },
    {
        label: 'Delete Event',
        href: '/studio/delete-event',
        icon: <Trash />,
    },
    {
        label: 'Event Attendees',
        href: '/studio/event-attendees',
        icon: <Users />,
    },
    { label: 'Check-in System', href: '/studio/check-in ', icon: <Ticket /> },
    // {
    //     label: 'Ticket Sales',
    //     href: '/studio/ticket-sales ',
    //     icon: <BarChartBig />,
    // },
    // { label: 'Vendors & Sponsors', href: '/studio/vendors', icon: <Store /> },
    // { label: 'Marketing', href: '/studio/marketing', icon: <Megaphone /> },
    {
        label: 'Volunteer Management',
        href: '/studio/volunteers',
        icon: <HandHelping />,
    },
    {
        label: 'Emergency Alerts',
        href: '/studio/emergency-alerts',
        icon: <AlertTriangle />,
    },
    // { label: 'AI Reports', href: '/studio/ai-reports', icon: <BrainCircuit /> },
    {
        label: 'Environmental Sensors',
        href: '/studio/environmental-sensors',
        icon: <ThermometerSun />,
    },
    { label: 'Settings', href: '/studio/setting', icon: <Settings /> },
    { label: 'Logout', href: '/logout', icon: <LogOut /> },
]

export default StudioSidebar
