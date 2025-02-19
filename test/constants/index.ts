import {
    Calendar,
    Edit,
    FileText,
    Flame,
    GitGraph,
    HelpCircle,
    Home,
    Inbox,
    LogOut,
    Settings,
    Trash,
    Users,
    Video,
    Wifi,
} from 'lucide-react'

export const globalSidebarItems = {
    content: [
        {
            title: 'Overview',
            url: '',
            icon: Home,
        },
        {
            title: 'Events',
            url: '/dashboard/events',
            icon: Inbox,
        },
        {
            title: 'Analytics',
            url: '/dashboard/analytics',
            icon: GitGraph,
        },
        {
            title: 'Scanner',
            url: '/scanner',
            icon: GitGraph,
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings,
        },
    ],
    footer: [
        {
            title: 'Support',
            url: '#',
            icon: HelpCircle,
        },
        {
            title: 'Logout',
            url: '#',
            icon: LogOut,
        },
    ],
}

export const eventSidebarItems = {
    content: [
        {
            title: 'Overview',
            url: '',
            icon: Home,
        },
        {
            title: 'Attendees',
            url: '/tickets',
            icon: Users,
        },
        {
            title: 'Analytics',
            url: '/analytics',
            icon: GitGraph,
        },

        {
            title: 'Edit Event',
            url: '/edit-event',
            icon: Edit,
        },
        {
            title: 'Live Control Room',
            url: '/live-control',
            icon: Video,
        },
        {
            title: 'Sensor Connect',
            url: '/sensor-connect',
            icon: Wifi,
        },
        {
            title: 'SOS Alert',
            url: '/sos-alert',
            icon: Flame,
        },
        {
            title: 'Delete Event',
            url: '/delete-event',
            icon: Trash,
        },
        {
            title: 'Settings',
            url: '/settings',
            icon: Settings,
        },
    ],
    footer: [
        {
            title: 'Support',
            url: '#',
            icon: HelpCircle,
        },
        {
            title: 'Logout',
            url: '#',
            icon: LogOut,
        },
    ],
}
