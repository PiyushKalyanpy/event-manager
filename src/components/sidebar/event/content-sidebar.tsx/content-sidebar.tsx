import {
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar'
import { eventSidebarItems, globalSidebarItems } from '@/constants'

import { useParams } from 'next/navigation'

const GlobalSidebarContent = () => {
    const { eventid } = useParams()

    console.log(eventid)
    return (
        <SidebarContent>
            <SidebarGroup className="flex flex-col gap-4">
                {/* <SidebarGroupLabel>Overview</SidebarGroupLabel> */}
                <SidebarGroupContent>
                    <SidebarMenu className="flex flex-col gap-4">
                        {eventSidebarItems.content.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton asChild>
                                    <a href={`/${eventid}/studio?p=${item.url.split('/').pop()}`}>
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
