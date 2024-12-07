'use client'

import AuthContextProvider from '@/context/AuthContext'
import EventContextProvider from '@/context/EventContext'
import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toast'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <NextUIProvider>
            <ToastContainer delay={2000} position="bottom-left" />
            <AuthContextProvider>
                <EventContextProvider>{children}</EventContextProvider>
            </AuthContextProvider>
        </NextUIProvider>
    )
}
