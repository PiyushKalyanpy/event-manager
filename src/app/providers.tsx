'use client'

import AuthContextProvider from '@/context/AuthContext'
import EventProvider from '@/context/EventContext'
import { HeroUIProvider } from '@heroui/react'
import TicketProvider from '@/context/TicketContext'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <AuthContextProvider>
                <EventProvider>
                    <TicketProvider>{children}</TicketProvider>
                </EventProvider>
            </AuthContextProvider>
        </HeroUIProvider>
    )
}
