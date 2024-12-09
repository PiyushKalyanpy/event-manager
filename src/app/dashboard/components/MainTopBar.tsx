import { Avatar, NavbarMenuToggle } from '@nextui-org/react'
import { Bell, User } from 'lucide-react'

import AvatarDropdown from '@/components/shared/AvatarDropdown'
import GoLive from '@/components/shared/GoLive'
import IconWithBorder from '@/components/shared/IconWithBorder'
import { SidebarTrigger } from '@/components/ui/sidebar'

const MainTopBar = () => {
    return (
        <div className="h-16    sticky top-0 z-10 bg-sidebar w-full justify-between flex items-center p-4 ">
            <SidebarTrigger />
            <div className="flex gap-4   items-center">
                <GoLive />
                <IconWithBorder icon={<Bell />} />
                <AvatarDropdown />
            </div>
        </div>
    )
}

export default MainTopBar
