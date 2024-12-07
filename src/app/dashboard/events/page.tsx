'use client'

import ActionBar from '../components/ActionBar'
import EventCard from '@/components/event/EventCard'
import MainHeader from '../components/MainHeader'
import { Plus } from 'lucide-react'

const DashboardEventPage = () => {
    return (
        <div>
            <MainHeader
                label="Events"
                actionIcon={Plus}
                actionLabel="Create new event"
                actionLink="/events/create"
            />
            <ActionBar />
            <div className="p-4 grid grid-cols-3"></div>
        </div>
    )
}

export default DashboardEventPage
