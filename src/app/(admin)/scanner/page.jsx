'use client'

import 'react-toastify/dist/ReactToastify.css'

import { Avatar, Button, addToast } from '@heroui/react'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'

import { Home } from 'lucide-react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useAuth } from '@/hooks/useAuth'
import { useEvent } from '@/hooks/useEvent'
import { useRouter } from 'next/navigation'
import { useTicket } from '@/hooks/useTicket'

const EventScanner = () => {
    const router = useRouter()
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState(null)
    const { scanTicket, scannedUser } = useTicket()
    const { userEvents, getEventsByUserId } = useEvent()
    const { user } = useAuth()

    console.log(scannedUser)

    useEffect(() => {
        if (user && userEvents.length === 0) {
            getEventsByUserId(user.uid)
        }
    }, [user])

    const handleScan = (result) => {
        setScanResult(result[0].rawValue)
        scanTicket(result[0].rawValue)
            .then(() => {
                if(scannedUser && scannedUser.status === "Booked"){
                    addToast({
                        title: `${scannedUser.user.name}`,
                        description: `${scannedUser.user.email}`,
                        color: 'danger',
                        variant: 'flat',
                        icon: (
                            <div className="p-2 ">
                                <Avatar
                                    size="sm"
                                    src={`${scannedUser.user.photoURL}`}
                                />
                            </div>
                        ),
                    })
                }
                if (scannedUser && scannedUser.status !=="Scanned") {
                    addToast({
                        title: `${scannedUser.user.name}`,
                        description: `${scannedUser.user.email}`,
                        color: 'success',
                        variant: 'flat',
                        icon: (
                            <div className="p-2 ">
                                <Avatar
                                    size="sm"
                                    src={`${scannedUser.user.photoURL}`}
                                />
                            </div>
                        ),
                    })
                }
            })
            .catch((error) => {
                toast.error('Error scanning ticket: ' + error.message)
            })
    }

    const handleEventSelect = (e) => {
        const selected = userEvents.find((event) => event.id === e.target.value)
        setSelectedEvent(selected)
    }

    if (!selectedEvent) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6">
                <ToastContainer
                    className="z-40"
                    theme="dark"
                    position="bottom-left"
                />
              
                <h2 className="text-3xl font-bold mb-6">Select an Event</h2>
                <select
                    className="bg-neutral-800 text-white p-3 rounded-xl w-80 mb-6 focus:outline-none"
                    onChange={handleEventSelect}
                >
                    <option value="">Choose an event</option>
                    {userEvents.map((event) => (
                        <option key={event.id} value={event.id}>
                            {event.data.name}
                        </option>
                    ))}
                </select>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-900 text-white p-6">
            <h2 className="text-3xl font-bold mb-4">
                Scanning - {selectedEvent.data.name}
            </h2>
            
            <ToastContainer
                className="z-40"
                theme="dark"
                autoClose={1000}
                position="bottom-left"
            />
            <p className="mb-6 text-neutral-400">
                Scan tickets for this event.
            </p>

            {!isScanning ? (
                <Button
                    onPress={() => setIsScanning(true)}
                    className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold py-3 px-6 rounded-2xl"
                >
                    Start Scanning
                </Button>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="w-80 h-80 rounded-2xl overflow-hidden relative">
                        <Scanner
                            allowMultiple={false}
                            onScan={handleScan}
                            audio={false}
                            className="w-full h-full"
                        />
                    </div>
                    {scanResult && (
                        <div className="mt-4 p-4 bg-neutral-800 text-green-500 rounded-xl">
                            Scanned Code: {scanResult}
                        </div>
                    )}
                    <Button
                        onPress={() => setIsScanning(false)}
                        className="mt-6 bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-2xl"
                    >
                        Stop Scanning
                    </Button>
                </div>
            )}
        </div>
    )
}

export default EventScanner
