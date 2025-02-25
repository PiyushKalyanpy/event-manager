'use client'

import { EventContext } from '@/context/EventContext'
import { useContext } from 'react'

export const useEvent = () => {
    return useContext(EventContext)
}
