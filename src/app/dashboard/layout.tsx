'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/global/app-sidebar'
import MainTopBar from './components/MainTopBar'

const DashboardLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-black min-h-screen">
                <MainTopBar />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout
