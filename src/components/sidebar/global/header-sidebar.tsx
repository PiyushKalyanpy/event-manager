import { Image } from '@nextui-org/react'
import { SidebarHeader } from '@/components/ui/sidebar'

const GlobalSidebarHeader = () => {
    return (
        <div>
            <SidebarHeader>
                <Image src="logo.svg" width={50} height={50} alt="logo" />
            </SidebarHeader>
        </div>
    )
}

export default GlobalSidebarHeader
