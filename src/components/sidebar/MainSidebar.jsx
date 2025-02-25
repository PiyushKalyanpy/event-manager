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
        <div className="w-full p-4 flex ">
            <div className="flex flex-col gap-2 w-full ">
                {sidebarItems.map((sidebarItem) => (
                    <Link
                        href={sidebarItem.href}
                        key={sidebarItem.label}
                        className={`flex gap-2 px-2 py-2  hover:bg-neutral-900 w-full   ${pathName == sidebarItem.path && 'bg-neutral-900 font-bold'} rounded-lg  `}
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
    {
        label: 'Edit Event',
        href: '/admin/edit-event/:id',
        icon: <PencilLine />,
    },
    {
        label: 'Event Attendees',
        href: '/admin/event-attendees/:id',
        icon: <Users />,
    },
    { label: 'Check-in System', href: '/admin/check-in/:id', icon: <Ticket /> },
    {
        label: 'Ticket Sales',
        href: '/admin/ticket-sales/:id',
        icon: <BarChartBig />,
    },
    { label: 'Vendors & Sponsors', href: '/admin/vendors', icon: <Store /> },
    { label: 'Marketing', href: '/admin/marketing', icon: <Megaphone /> },
    {
        label: 'Volunteer Management',
        href: '/admin/volunteers',
        icon: <HandHelping />,
    },
    {
        label: 'Emergency Alerts',
        href: '/admin/emergency-alerts',
        icon: <AlertTriangle />,
    },
    { label: 'AI Reports', href: '/admin/ai-reports', icon: <BrainCircuit /> },
    {
        label: 'Sustainability',
        href: '/admin/sustainability-reports',
        icon: <ThermometerSun />,
    },
    { label: 'Settings', href: '/admin/settings', icon: <Settings /> },
    { label: 'Logout', href: '/logout', icon: <LogOut /> },
]

export default MainSidebar
