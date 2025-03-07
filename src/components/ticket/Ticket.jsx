'use client'

import { useEffect, useState } from 'react'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import QRCode from 'react-qr-code'
import { useEvent } from '@/hooks/useEvent'

const Ticket = ({ item }) => {
    const { getEventById } = useEvent()

    if (!item) {
        return (
            <div className="text-center text-red-500">
                Ticket data not available
            </div>
        )
    }

    const {
        createdAt,
        eventId,
        eventName,
        eventImage,
        scannedAt,
        id,
        price,
        purchaseTime,
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        secureCode,
        status,
        ticketType,
        user,
        userId,
        venue,
        eventDate,
        startTime,
        endTime,
    } = item

    const barcodeValue = status === 'Scanned' ? '00000000' : secureCode

    return (
        <div className="w-full relative flex flex-col sm:flex-row h-auto sm:h-64 overflow-hidden rounded-2xl bg-cover bg-center bg-no-repeat">
            {/* Background Image */}
            <div className="absolute w-full h-full z-0">
                <Image
                    src={eventImage || '/placeholder.jpg'}
                    width={900}
                    height={100}
                    alt="Event Image"
                    className={`w-full object-cover blur-md h-full scale-125 brightness-[0.4] ${status === 'Scanned' ? 'saturate-0' : ''}`}
                    priority
                />
            </div>

            {/* Ticket Details */}
            <div className="flex z-10 w-full sm:w-3/4 h-full flex-col gap-3 p-6 sm:p-8">
                <h2 className="text-2xl font-bold line-clamp-1">
                    {eventName || 'Event Name Not Available'}
                </h2>

                <p className="flex items-center gap-2 line-clamp-1 text-ellipsis">
                    <MapPin size={16} />
                <span className='line-clamp-1'>
                    {venue || 'Venue Not Available'}
                    </span>
                </p>

                <div className="text-neutral-300">
                    <p>DATE : {eventDate || 'Date Not Available'}</p>
                    <p>
                        TIME :{' '}
                        {startTime && endTime
                            ? `${startTime} - ${endTime}`
                            : 'Time Not Available'}
                    </p>
                </div>

 
                <div className="flex gap-4">
                    <p>{ticketType || 'Ticket Type Not Available'}</p>
                     <p>
                        Paid amount :
                        <span className="font-bold font-serif pl-3 text-yellow-300">
                            ₹
                        </span>
                        <span className="font-bold text-yellow-300">
                            {price || '0'}
                        </span>
                    </p>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="flex w-full sm:w-1/4 border z-10 bg-white justify-center h-auto sm:h-full text-black items-center p-4 sm:p-0">
                <div className=" scale-75 h-fit">
                    <QRCode value={barcodeValue || '00000000'} size={200} />
                    <p className="text-center">{barcodeValue || '00000000'}</p>
                </div>
            </div>

            {/* Scanned Ticket Overlay */}
            {status === 'Scanned' && scannedAt && (
                <div className="absolute top-24 w-full h-1/4 bg-white text-black z-20 flex flex-col justify-center items-center gap-2">
                    <p className="text-xl font-bold">Scanned Ticket</p>
                    <p className="text-xl font-bold">
                        {formatDateTime(convertTimestampToDate(scannedAt))}
                    </p>
                </div>
            )}
        </div>
    )
}

/* Convert Firestore Timestamp to Date String */
function convertTimestampToDate(timestamp) {
    if (!timestamp || !timestamp.seconds) return null
    return new Date(timestamp.seconds * 1000).toISOString()
}

/* Format Date and Time */
function formatDateTime(timestamp) {
    if (!timestamp) return 'Date/Time Not Available'

    const date = new Date(timestamp)
    return date
        .toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
        .replace(',', ' ·')
}

export default Ticket
