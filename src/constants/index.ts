import {
    Calendar,
    Edit,
    FileText,
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
} from 'lucide-react';

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
            title: 'Tickets',
            url: '/events',
            icon: Inbox,
        },
        {
            title: 'Analytics',
            url: '/analytics',
            icon: GitGraph,
        },
        {
            title: 'Attendees',
            url: '/attendees',
            icon: Users,
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
