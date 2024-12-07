import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'

import { globalSidebarItems } from '@/constants'

const GlobalSidebarContent = () => {
    return (
        <SidebarContent>
            <SidebarGroup className="flex flex-col gap-4">
                {/* <SidebarGroupLabel>Overview</SidebarGroupLabel> */}
                <SidebarGroupContent>
                    <SidebarMenu className="flex flex-col gap-4">
                        {globalSidebarItems.content.map((item) => (
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
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    )
}

export default GlobalSidebarContent
