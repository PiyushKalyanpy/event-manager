import { Sidebar, SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';

import EventSidebarHeader from './header-sidebar'
import GlobalSidebarContent from './content-sidebar.tsx/content-sidebar'
import { eventSidebarItems } from '@/constants';

export function AppSidebar() {
    return (
        <Sidebar>
            <EventSidebarHeader />
            <GlobalSidebarContent />
            <SidebarFooter>
                <SidebarMenu>
                    {eventSidebarItems.footer.map((item) => (
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
