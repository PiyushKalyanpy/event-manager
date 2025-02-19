'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import { AppSidebar } from '@/components/sidebar/event/app-sidebar'

const StudioLayout = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full bg-black min-h-screen">{children}</main>
        </SidebarProvider>
    )
}

export default StudioLayout
