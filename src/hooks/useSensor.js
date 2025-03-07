'use client'

import { SensorContext } from '@/context/SensorContext'
import { useContext } from 'react'

export const useSensor = () => {
    return useContext(SensorContext)
}
