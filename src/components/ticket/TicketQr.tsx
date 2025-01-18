'use client'

import Image from 'next/image'
import TicketDivider from './TicketDivider'

const TicketQr = () => {
    return (
        <div className="wrapper bg-black/20 absolute z-20 top-0 left-0 rounded-3xl  backdrop-blur-sm">
            <div className="w-1/4 h-72 bg-[url('/background.svg')] p-4  rounded-3xl ">
                <div className="bg-white rounded-3xl h-full  ">
                    sdf
                    <TicketDivider />
                </div>
            </div>
        </div>
    )
}

export default TicketQr
