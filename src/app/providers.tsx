'use client'

import AuthContextProvider from '@/context/AuthContext'
import { HeroUIProvider } from '@heroui/react'

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <HeroUIProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
        </HeroUIProvider>
    )
}
