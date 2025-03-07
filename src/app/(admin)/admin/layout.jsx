'use client'

import Image from 'next/image'
import MainSidebar from '@/components/sidebar/MainSidebar'

const StudioLayout = ({ children }) => {
    return (
        <div className="w-screen flex min-h-screen ">
           <Image
                            src="https://i.pinimg.com/736x/b2/fb/21/b2fb21f206c56acc2007ed7e587d9770.jpg"
                            alt="bg"
                            className="object-cover absolute blur-2xl brightness-50  z-0 w-screen h-screen"
                            width={100}
                            quality={1}
                             height={100}
                        />
            <div className="w-1/4  bg-black/90   backdrop-blur-2xl sticky top-0  flex ">
                <MainSidebar />
            </div>
            <div className="w-full flex  bg-black/60  backdrop-blur-2xl overflow-y-scroll   ">
                {children}
            </div>
        </div>
    )
}

export default StudioLayout
