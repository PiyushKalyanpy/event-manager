import './globals.css'

import { JetBrains_Mono, Manrope } from 'next/font/google'

import type { Metadata } from 'next'
import { Providers } from './providers'
import { ToastContainer } from 'react-toast'
import localFont from 'next/font/local'

const font = JetBrains_Mono({
    weight: ['300'],
    subsets: ['latin-ext'],
    variable: '--font-inter',
})

export const metadata: Metadata = {
    title: 'Real-Time Event Management - My Event Manager App',
    description:
        'Manage your events in real-time, get instant feedback, monitor crowds, and handle ticketing efficiently with My Event Manager App.',
    applicationName: 'My Event Manager',
    authors: [
        {
            name: 'John Doe',
            url: 'https://www.johndoe.com',
        },
        {
            name: 'Jane Smith',
            url: 'https://www.janesmith.com',
        },
    ],
    generator: 'Next.js',
    keywords: [
        'event management',
        'real-time event',
        'crowd monitoring',
        'ticketing',
        'live events',
    ],
    referrer: 'no-referrer',
    themeColor: [
        {
            color: '#0070f3',
        },
    ],
    colorScheme: 'light',
    viewport: 'width=device-width, initial-scale=1',
    creator: 'My Event Manager Team',
    publisher: 'My Event Manager Inc.',
    robots: 'index, follow',

    openGraph: {
        title: 'Real-Time Event Management - My Event Manager App',
        description:
            'Manage your events in real-time with powerful tools like feedback collection, crowd monitoring, and ticketing.',
        url: 'https://www.myeventmanagerapp.com',
        type: 'website',
    },
    manifest: '/manifest.json',
    twitter: {
        card: 'summary_large_image',
        site: '@MyEventManager',
        title: 'Real-Time Event Management - My Event Manager App',
        description:
            'Manage your events with ease and collect real-time feedback.',
    },

    abstract:
        'An app designed for efficient event management, offering real-time feedback, ticketing, and crowd monitoring.',
    appLinks: {
        android: {
            package: 'com.myeventmanagerapp',
            url: 'https://play.google.com/store/apps/details?id=com.myeventmanagerapp',
        },
        ios: {
            url: 'https://apps.apple.com/us/app/my-event-manager/id1234567890',
        },
    },
    archives: [
        'https://archive.myeventmanagerapp.com/2024',
        'https://archive.myeventmanagerapp.com/2023',
    ],
    assets: ['/images/logo.png', '/images/cover.jpg'],
    bookmarks: ['/bookmarks/event1', '/bookmarks/event2'],
    category: 'Event Management',
    classification: 'Software',
    other: {
        license: 'MIT',
        terms_of_service: '/terms',
        privacy_policy: '/privacy-policy',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={`${font.className} dark antialiased `}>
                <Providers>{children}</Providers>
            </body>
        </html>
    )
}
