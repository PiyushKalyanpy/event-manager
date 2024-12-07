import {
    Calendar,
    GitGraph,
    HelpCircle,
    Home,
    Inbox,
    LogOut,
    Search,
    Settings,
    UserRound,
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
