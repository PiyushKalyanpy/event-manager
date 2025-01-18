'use client'

import ActionBar from '../components/ActionBar'
import EventCard from '@/components/event/EventCard'
import MainHeader from '../components/MainHeader'
import { Plus } from 'lucide-react'
import { useEvent } from '@/hooks/useEvent'

const DashboardEventPage = () => {
    const {events} : any = useEvent()
    console.log(events)
    return (
        <div>
            <MainHeader
                label="Events"
                actionIcon={Plus}
                actionLabel="Create new event"
                actionLink="/events/create"
            />
            <div className="p-4 grid gap-8  grid-cols-3">
                {events.map((event: any) => (
                    <EventCard event={event} key={event.id} />
                ))}
            </div>
        </div>
    )
}

export default DashboardEventPage
