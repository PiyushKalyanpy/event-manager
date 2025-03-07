'use client'

import { Button, Input } from '@heroui/react'

import { useEvent } from '@/hooks/useEvent'
import { useState } from 'react'

const DeleteEvent = () => {
    const { selectedEvent, deleteEvent } = useEvent()
    const [input, setInput] = useState()

    return (
        <div className="page-wrapper ">
            <div className="flex flex-col gap-4  w-1/2 items-center  text-center  bg-black/60 p-8 rounded-3xl border border-white/5">
                <p className="text-3xl font-bold">{selectedEvent.data.name}</p>
                <p className="text-white/40 text-sm">
                    Are you sure you want to delete this event? This action
                    cannot be undone. If you want to delete this event, please
                    enter the name of the event below.
                </p>
                <Input
                    type="text"
                    size="lg"
                    placeholder="Enter the name of the event to confirm"
                    value={input}
                    className="placeholder:text-white outline-none align-center text-center"
                    onChange={(e) => setInput(e.target.value)}
                />
                <Button
                    // onPress={() => deleteEvent(selectedEvent.id)}
                    disabled={input !== selectedEvent.data.name}
                    color={
                        input !== selectedEvent.data.name ? 'default' : 'danger'
                    }
                >
                    Delete Event
                </Button>
            </div>
        </div>
    )
}

export default DeleteEvent
