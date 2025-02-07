'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

import { Button } from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import MiniEventCard from '../event/MiniEventCard'
import React from "react";
import ValidCard from './ValidCard'
import Webcam from "react-webcam";
import { useEvent } from '@/hooks/useEvent'
import { useRef } from 'react'

const ScannerScreen = () => {
    const { events }: any = useEvent()
    const event = events[0]

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
      };
    return (
        <div className="border w-full h-screen md:w-1/2 p-4 gap-8  flex flex-col ">
            {/* event detials */}
            {event && (
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="w-full ">
                            <div className="flex justify-between p-2 items-center bg-neutral-900 rounded-2xl w-full">
                                <MiniEventCard event={event} />
                                <ChevronDown />
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex rounded-xl p-2 flex-col gap-2">
                            {events &&
                                events.map((event: any) => (
                                    <MiniEventCard
                                        event={event}
                                        key={event.id}
                                    />
                                ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            )}
             <Webcam
    audio={false}
    height={720}
    screenshotFormat="image/jpeg"
    width={1280}
    videoConstraints={videoConstraints}
  >
    {({ getScreenshot }) => (
      <button
        onClick={() => {
          const imageSrc = getScreenshot()
        }}
      >
        Capture photo
      </button>
    )}
  </Webcam>

            {/* camera view  */}
            <div className="h-64 w-full bg-neutral-800 rounded-xl">
                {/* display camera here */}
                <div>
                    <video
                        ref={videoRef}
                        width="100%"
                        height="340px"
                        style={{ border: '1px solid white' }}
                        autoPlay
                        className="w-full h-64 border object-cover rounded-2xl"
                        muted
                        loop
                        src="https://www.w3schools.com/html/mov_bbb.mp4"
                    />
                </div>
            </div>
            {/* scanner result */}
            <div className="">
                <ValidCard />
            </div>
            {/* stop scanning button */}
            <div className="w-full items-center flex  left-0 justify-center fixed bottom-8 p-2">
                <Button className="w-3/4 rounded-full">Stop Scanning</Button>
            </div>
        </div>
    )
}

export default ScannerScreen
