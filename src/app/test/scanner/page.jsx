'use client'

import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toast'

import { Button } from '@heroui/react'
import { Scanner } from '@yudiel/react-qr-scanner'
import { useAuth } from '@/hooks/useAuth' // Import useAuth for user data
import { useEvent } from '@/hooks/useEvent'
import { useRouter } from 'next/navigation' // Import useRouter
import { useTicket } from '@/hooks/useTicket'

const EventScanner = () => {
    const router = useRouter() // Initialize router
    const [selectedEvent, setSelectedEvent] = useState(null)
    const [isScanning, setIsScanning] = useState(false)
    const [scanResult, setScanResult] = useState(null)
    const { scanTicket } = useTicket()
    const { events, userEvents, getEventById, getEventByUserId } = useEvent()
    const { user } = useAuth() // Get user data

    const handleScan = (result) => {
        console.log('Scan Result:', result[0].rawValue)
        setScanResult(result[0].rawValue)
        scanTicket(result[0].rawValue)
            .then(() => {
                toast.success('Ticket scanned successfully!')
            })
            .catch((error) => {
                toast.error('Error scanning ticket: ' + error.message)
            })
    }

    const handleEventSelect = (event) => {
        setSelectedEvent(event)
    }

    const startScanning = () => {
        setIsScanning(true)
    }

    const stopScanning = () => {
        setIsScanning(false)
        setScanResult(null) // Clear previous result
    }

    useEffect(() => {
        if (user && userEvents.length == 0) {
            console.log('Getting events for user')
            console.log(user.uid, 'df')
            getEventByUserId(user.uid)
            console.log(userEvents)
        }
    }, [user])

    if (!selectedEvent) {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Select Event</h2>
                <select
                    className="border rounded p-2 mb-4 w-full"
                    value={selectedEvent?.id || ''} // Handle initial null value
                    onChange={(e) => {
                        const selected = userEvents?.find(
                            (event) => event.id === e.target.value
                        )
                        console.log(selected)

                        setSelectedEvent(selected)
                    }}
                >
                    <option value="">Select an event</option>{' '}
                    {/* Default option */}
                    {userEvents?.map((event) => (
                        <option
                            onClick={() => setSelectedEvent(event)}
                            key={event.id}
                            value={event.id}
                        >
                            {event.data.name} {/* Display event name */}
                        </option>
                    ))}
                </select>
                {selectedEvent}

                 {selectedEvent && (
                    <div className="border rounded p-4">
                        <h3 className="text-lg font-medium">
                            {selectedEvent.data.name}
                        </h3>
                        <p>{selectedEvent.data.description}</p>
                        {/* Add other details as needed */}
                    </div>
                )}
            </div>
        )
    }

    return (
        <div className="container mx-auto p-4 h-screen">
            <ToastContainer />
            <h2 className="text-2xl font-bold mb-4">
                Event Scanner - {selectedEvent.name}
            </h2>
            <p className="mb-4">Scan ticket QR codes for this event.</p>

            {!isScanning ? (
                <div>
                    <Button
                        onPress={startScanning}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Start Scanning
                    </Button>
                </div>
            ) : (
                <div>
                    <div className="w-1/2 h-1/2 relative">
                        {' '}
                        {/* Added relative for positioning */}
                        <Scanner
                            allowMultiple={false} // Usually you scan one at a time
                            onScan={handleScan}
                            className="w-full h-full" // Make scanner fill the container
                        />
                        {/* Optional: Display scan result */}
                        {scanResult && (
                            <div className="absolute top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center text-white">
                                {scanResult}
                            </div>
                        )}
                    </div>
                    <Button
                        onPress={stopScanning}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
                    >
                        Stop Scanning
                    </Button>
                </div>
            )}
        </div>
    )
}

export default EventScanner
