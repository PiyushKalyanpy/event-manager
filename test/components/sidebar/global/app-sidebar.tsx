import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

import GlobalSidebarContent from './content-sidebar.tsx/content-sidebar'
import GlobalSidebarHeader from './header-sidebar'
import { globalSidebarItems } from '@/constants'

export function AppSidebar() {
    return (
        <Sidebar>
            <GlobalSidebarHeader />
            <GlobalSidebarContent />
            <SidebarFooter>
                <SidebarMenu>
                    {globalSidebarItems.footer.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild>
                                <a href={item.url}>
                                    <item.icon />
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}
