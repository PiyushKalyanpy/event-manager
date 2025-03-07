'use client'

import { LiveContext } from '../context/LiveContext'
import { useContext } from 'react'

export const useLive = () => {
    return useContext(LiveContext)
}
