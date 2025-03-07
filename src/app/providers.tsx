'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'

import AuthContextProvider from '@/context/AuthContext'
import EventProvider from '@/context/EventContext'
import LiveProvider from '@/context/LiveContext'
import {SensorProvider} from '@/context/SensorContext'
import TicketProvider from '@/context/TicketContext'
import { ToastContainer } from 'react-toastify'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <AuthContextProvider>
                <EventProvider>
                    <TicketProvider>
                        <ToastProvider placement="top-center" />
                        <ToastContainer
                            className="z-40"
                            theme="dark"
                            position="bottom-left"
                        />
                        <SensorProvider>
                            <LiveProvider>
                                {children}
                            </LiveProvider>
                        </SensorProvider>
                    </TicketProvider>
                </EventProvider>
            </AuthContextProvider>
        </HeroUIProvider>
    )
}
