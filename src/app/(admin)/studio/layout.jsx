'use client'

import { Avatar, User } from '@heroui/react'

import Image from 'next/image'
import StudioSidebar from '@/components/sidebar/StudioSidebar'
import { useEvent } from '@/hooks/useEvent'

const StudioLayout = ({ children }) => {
    const { selectedEvent } = useEvent()
     if(!selectedEvent){
        return <div className='page-wrapper'>No event selected</div>
    }
    return (
        <div className="w-screen flex min-h-screen ">
            <Image
                src="https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg"
                alt="bg"
                className="object-cover absolute  z-0 w-screen h-screen"
                width={100}
                height={100}
            />
            <div className="w-1/4  bg-black/90   flex-col gap-6  backdrop-blur-2xl sticky top-0  flex ">
                {/* selected event  */}
                <div className="p-4  flex gap-2 items-center">
                    <div>
                        <Avatar radius="lg" src={selectedEvent.data.imageURL} />
                    </div>
                    <div>
                        <p className="line-clamp-1 text-sm text-ellipsis">
                            {selectedEvent.data.name}
                        </p>
                        <p className="line-clamp-1 text-sm text-neutral-50/60 text-ellipsis">
                            {selectedEvent.data.date}
                        </p>
                    </div>
                </div>
                <StudioSidebar />
            </div>
            <div className="w-full flex  bg-black/60  backdrop-blur-2xl overflow-y-scroll   ">
                {children}
            </div>
        </div>
    )
}

export default StudioLayout
