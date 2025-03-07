import './globals.css'

import { Inter_Tight, Manrope, Space_Grotesk } from 'next/font/google'

import type { Metadata } from 'next'
import { Providers } from './providers'
import { Suspense } from 'react'
import localFont from 'next/font/local'

const font = Space_Grotesk({
    weight: ['300'],
    subsets: ['latin-ext'],
    variable: '--font-inter',
})
const manrope = Manrope({
    weight: ['400'],
    subsets: ['latin-ext'],
})

export const metadata: Metadata = {
    title: 'Real-Time Event Management - My Event Manager App',
    description:
        'Manage your events in real-time, get instant feedback, monitor crowds, and handle ticketing efficiently with My Event Manager App.',
    applicationName: 'My Event Manager',

    creator: 'Piyush Kalyan',
    publisher: 'Piyush Kalyan',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body
                className={`${manrope.className} dark antialiased bg-black w-screen min-h-screen `}
            >
                <Suspense>
                    <Providers>{children}</Providers>
                </Suspense>
            </body>
        </html>
    )
}
